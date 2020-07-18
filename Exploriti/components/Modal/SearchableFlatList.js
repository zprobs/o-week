import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { Modalize } from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useQuery } from '@apollo/react-hooks';
import { NULL } from '../../graphql';

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
 * @param aliased Whether to filter with aliases
 * @param offset A top offset for the modal
 * @param initialSelection The initially selected data of the list in the form of a Map(String, Bool). Try to avoid adding it on subsequent renders
 * @param clearOnClose {boolean} if true, will clear the selected data on close.
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
      aliased,
      onPress,
      cancelButtonText,
      offset,
      initialSelection,
      clearOnClose
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [unfilteredList, setUnfilteredList] = useState(data ? data : []);
    const [filteredList, setFilteredList] = useState(unfilteredList);
    const debounceQuery = useDebounce(searchQuery, 300);
    const [inputRef, setInputFocus] = useFocus();
    const [selected, setSelected] = useState(
      !!initialSelection ? initialSelection : new Map(),
    );
    const [count, setCount] = useState(0);
    // used to prevent the interests from being queried right away when visiting MyProfile
    const verifiedQuery = query ? query : NULL;
    const didSetFirst = useRef(false);

    const result = useQuery(verifiedQuery, {
      skip: query == undefined,
      variables: variables,
    });

    if (!result.loading && !didSetFirst.current  && result.data) {
      didSetFirst.current = true;
      setFilteredList(result.data[title]);
      setUnfilteredList(result.data[title]);
    }

    const onSelect = React.useCallback(
      (item) => {
        const newSelected = new Map(selected);
        if (selected.get(item) === false || selected.get(item) == undefined) {
          if (count >= max) {
            return;
          }
          setCount(count + 1);
        } else {
          setCount(count - 1);
        }
        newSelected.set(item, !selected.get(item));
        setSelected(newSelected);
      },
      [selected],
    );

    useEffect(() => {
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
    }, [debounceQuery]);

    const renderItem = ({ item }) => {
      const isSelected = !!selected.get(item);
      return (
        <TouchableOpacity
          key={item}
          onPress={() => onSelect(item)}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.item}>{query ? item.name : item} </Text>
          {isSelected ? (
            <Icon name={'check'} style={styles.icon} size={28} />
          ) : null}
        </TouchableOpacity>
      );
    };

    const renderItemWithImage = ({ item, index }) => {
      const { image } = item;
      const isSelected = !!selected.get(item);
      return (
        <View style={{ backgroundColor: index % 2 ? '#f2f2f2' : '#FFFFFF' }}>
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Image source={{ uri: image }} style={styles.image}></Image>
            <Text style={styles.itemWithImage}>
              {query ? item.name : item}{' '}
            </Text>
            <View style={styles.imageContainer}>
              {isSelected ? (
                <Icon name={'check'} style={styles.icon} size={28} />
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      );
    };

    const search = (
      <SearchBar
        ref={inputRef}
        placeholder={'Search for ' + title + '...'}
        onChangeText={(q) => setSearchQuery(q)}
        text={searchQuery}
        hideBackground={true}
        onCancelButtonPress={() => {
          ref.current.close();
          if (onPress) {
            onPress(mapToObjects(selected));

          }
        }}
        cancelButtonText={cancelButtonText}
        showsCancelButton={true}
      />
    );

    const ItemSeparator = () => {
      return <View style={styles.separator} />;
    };

    return (
      <Modalize
        ref={ref}
        flatListProps={{
          data: filteredList,
          keyExtractor: (item) => item,
          renderItem: hasImage ? renderItemWithImage : renderItem,
          marginTop: 10,
          ItemSeparatorComponent: ItemSeparator,
          extraData: selected,
        }}
        tapGestureEnabled={false}
        HeaderComponent={search}
        onOpened={setInputFocus}
        onClose={() => {
          if (setData) {
            setData(mapToString(selected, query));
          }
          if (setSelection) {
            setSelection(mapToIds(selected, query));
          }
          if (clearOnClose) setSelected(new Map());
        }}
        modalTopOffset={offset ? offset : 0}
      />
    );
  },
);

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
