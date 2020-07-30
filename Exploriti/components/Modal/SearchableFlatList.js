import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import { Modalize } from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useQuery } from '@apollo/react-hooks';
import { NULL } from '../../graphql';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useKeyboard } from '../../context';
import ImgBanner from '../ReusableComponents/ImgBanner';
import SearchUsers from '../../assets/svg/search-users.svg';
import { showMessage } from 'react-native-flash-message';

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 * A Vertical FlatList component with a search-bar at the top. Used for long lists
 * @param data an Array of data to be displayed in the List
 * @param query GraphQL query to execute to receive the data. Used instead of the data prop
 * @param title The word to be placed inside the search-bar placeholder in the form: Search for {title}...
 * @param setData The function which will set the strings of selected items
 * @param setSelection The function which will set the id's of selected items
 * @param max The maximum number of selections allowed to be made
 * @param min {int} an optional minimum number of selections before continuing
 * @param aliased Whether to filter with aliases
 * @param onPress
 * @param floatingButtonText {string} The label for the done button
 * @param offset A top offset for the modal
 * @param initialSelection The initially selected data of the list in the form of a Map(String, Bool). Try to avoid adding it on subsequent renders
 * @param clearOnClose {boolean} if true, will clear the selected data on close.
 * @param serverSearch {boolean} if true, The query data will be retrieved from the server when the user types.
 * @returns {*}
 * @constructor
 */
const SearchableFlatList = React.forwardRef(
  (
    {
      data,
      query,
      variables,
      hasImage,
      title,
      setData,
      setSelection,
      max,
      min,
      aliased,
      onPress,
      floatingButtonText,
      floatingButtonOffset,
      offset,
      initialSelection,
      clearOnClose,
      serverSearch,
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [unfilteredList, setUnfilteredList] = useState(data ? data : []);
    const [filteredList, setFilteredList] = useState(unfilteredList);
    const debounceQuery = useDebounce(serverSearch ? null : searchQuery, 300);
    const [inputRef, setInputFocus] = useFocus();
    const [selected, setSelected] = useState(new Map());
    const [count, setCount] = useState(0);
    // used to prevent the interests from being queried right away when visiting MyProfile
    const verifiedQuery = query ? query : NULL;
    const didSetFirst = useRef(false);
    const opacity = useState(new Animated.Value(0))[0];
    const floatingOffset = useState(new Animated.Value(0))[0];
    const [buttonIsShowing, setButtonIsShowing] = useState(false);
    const [keyboardHeight] = useKeyboard();



    const {data: QueryData, loading, error} = useQuery(verifiedQuery, {
      skip: query == undefined || (serverSearch && searchQuery === ''),
      variables: serverSearch ? { query: `%${searchQuery}%` } : variables,
    });

    if (error) {
      showMessage({
        message: "Server Error",
        description: error.message,
        type: 'warning',
        icon: 'auto'
      });
    }

    if (!loading && !didSetFirst.current && QueryData && !error) {
      didSetFirst.current = true;
      if (!serverSearch) setUnfilteredList(QueryData[title]);
      setFilteredList(QueryData[title]);
    }

    useEffect(()=>{
      if (initialSelection) {
        const newSelected = new Map();
        for (const entry of initialSelection.entries()) {
          if (entry[1]) {
            const item = unfilteredList.filter((interest)=>interest.id===entry[0].id)
            if (item.length > 0) {
              newSelected.set(item[0], true)
              setCount(count+1);
            }
          }
        }
        setSelected(newSelected);
      }
    }, [initialSelection, QueryData])



    function showButton() {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(floatingOffset, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      setButtonIsShowing(true);
    }

    function hideButton() {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(floatingOffset, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      setButtonIsShowing(false)
    }

    const onSelect = (item) => {

        const newSelected = new Map(selected);
        if (!!selected.get(item) === false) {
          if (count >= max) {
            return;
          }
          if (!buttonIsShowing && (!min || count + 1 >= min)) {
            showButton();
          }
          setCount(count + 1);
        } else {
          if (buttonIsShowing && min && count <= min) {
            hideButton()
          }
          setCount(count - 1);
        }
      newSelected.set(item, !selected.get(item));
        setSelected(newSelected);
    }

    useEffect(() => {
      // only do the local search if not a server search
      if (!serverSearch) {
        const lowerCaseQuery = debounceQuery.toLowerCase();
        let newData;
        if (query) {
          if (aliased) {
            newData = unfilteredList.filter(
              (item) =>
                item.name.toLowerCase().includes(lowerCaseQuery) ||
                item.aliases.filter((alias) =>
                  alias.toLowerCase().includes(lowerCaseQuery),
                ).length !== 0,
            );
          } else {
            newData = unfilteredList.filter((item) =>
              item.name.toLowerCase().includes(lowerCaseQuery),
            );
          }
        } else {
          newData = unfilteredList.filter((item) =>
            item.toLowerCase().includes(lowerCaseQuery),
          );
        }
        setFilteredList(newData);
      }
    }, [debounceQuery]);

    const renderItem = ({ item, index }) => (
      <Item
        item={item}
        index={index}
        hasImage={hasImage}
        onSelect={onSelect}
        isSelected={!!selected.get(item)}
      />
    );

    const onFloatingButtonPress = () => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
      ref.current.close();
      if (onPress) {
        onPress(mapToObjects(selected));
      }
    };

    const search = React.useMemo(() => {
      return (
        <SearchBar
          ref={inputRef}
          placeholder={'Search for ' + title + '...'}
          onChangeText={(q) => {
            if (serverSearch) didSetFirst.current = false;
            setSearchQuery(q);
          }}
          hideBackground={true}
          showsCancelButton={false}
          showsCancelButtonWhileEditing={false}
        />
      );
    }, [title, setSearchQuery]);

    const renderFloatingComponent = () => {
      return (
        <Animated.View
          style={[
            styles.floating,
            {
              opacity,
              transform: [{ translateY: floatingOffset }],

              bottom: floatingButtonOffset
                ? keyboardHeight - floatingButtonOffset
                : keyboardHeight,
            },
          ]}>
            <ButtonColour
              colour={ThemeStatic.accent}
              light={true}
              label={floatingButtonText}
              containerStyle={styles.button}
              onPress={onFloatingButtonPress}
              disabled={!buttonIsShowing}
            />
        </Animated.View>
      );
    };

    const onClose = () => {
      inputRef && inputRef.current && inputRef.current.blur();
      hideButton()
      if (setData) {
        setData(mapToString(selected, query));
      }
      if (setSelection) {
        setSelection(mapToIds(selected, query));
      }
      if (clearOnClose) {
        setSelected(new Map());
        setCount(0);
        setSearchQuery('');
      }
    };

    const Modal = React.useMemo(() => {
      return (
        <Modalize
          ref={ref}
          flatListProps={{
            data: filteredList,
            keyExtractor: keyExtractor,
            renderItem: renderItem,
            marginTop: 10,
            ItemSeparatorComponent: ItemSeparator,
            extraData: selected,
            ListEmptyComponent: listEmptyComponent,
            ListHeaderComponent: search,
          }}
          tapGestureEnabled={false}
          onOpened={setInputFocus}
          onClose={onClose}
          modalTopOffset={offset}
          FloatingComponent={renderFloatingComponent}
        />
      );
    }, [ref, offset, filteredList, selected, buttonIsShowing]);

    return Modal;
  },
);

const listEmptyComponent = () => (
  <ImgBanner Img={SearchUsers} placeholder="" spacing={0.15} />
);

const keyExtractor = (item) => (item.id ? item.id.toString() : item);

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const Item = React.memo(({ item, index, hasImage, onSelect, isSelected }) => {
  if (hasImage) {
    const { image } = item;
    return (
      <View style={{ backgroundColor: index % 2 ? '#f2f2f2' : '#FFFFFF' }}>
        <TouchableOpacity
          onPress={() => onSelect(item)}
          style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.itemWithImage}>
            {item.name ? item.name : item}{' '}
          </Text>
          <View style={styles.imageContainer}>
            {isSelected ? (
              <Icon name={'check'} style={styles.icon} size={28} />
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        key={item}
        onPress={() => onSelect(item)}
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.item}>{item.name ? item.name : item} </Text>
        {isSelected ? (
          <Icon name={'check'} style={styles.icon} size={28} />
        ) : null}
      </TouchableOpacity>
    );
  }
});

/**
 * A custom hook used to delay showing search results in the search bar
 * @param value The value to be returned
 * @param delay The delay in milliseconds
 * @returns value
 */
export const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const styles = StyleSheet.create({
  item: {
    ...FontWeights.Light,
    ...FontSizes.Label,
    marginVertical: 10,
    marginLeft: 15,
  },
  itemWithImage: {
    ...FontWeights.Light,
    ...FontSizes.Label,
    marginVertical: 25,
    marginLeft: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: colours.text02,
    marginLeft: 15,
    marginRight: 15,
  },
  icon: {
    alignSelf: 'center',
    color: colours.accent,
    marginRight: 18,
  },
  imageContainer: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
  done: {
    width: '85%',
    alignSelf: 'center',
    zIndex: 4,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginVertical: 10,
    marginLeft: 10,
    backgroundColor: colours.placeholder,
  },
  floating: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,

    position: 'absolute',

    width: '100%',
  },

  button: {
    width: '80%',
  },
});

function mapToString(map, query) {
  let array = [];
  map.forEach((value, key) => {
    if (value) {
      array.push(query ? key.name : key);
    }
  });
  return array;
}

function mapToIds(map, query) {
  let array = [];
  map.forEach((value, key) => {
    if (value) {
      array.push(query ? key.id : key);
    }
  });
  return array;
}

function mapToObjects(map) {
  let array = [];
  map.forEach((value, key) => {
    if (value) {
      array.push(key);
    }
  });
  return array;
}

export default SearchableFlatList;
