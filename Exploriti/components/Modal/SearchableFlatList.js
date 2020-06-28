import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SearchBar from "react-native-search-bar";
import { Modalize } from "react-native-modalize";
import Fonts from "../../theme/Fonts";
import { Theme } from "../../theme/Colours";
import Icon from "react-native-vector-icons/EvilIcons";
import { useQuery } from "@apollo/react-hooks";
import { NULL } from "../../graphql";

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
 * @returns {*}
 * @constructor
 */
const SearchableFlatList = React.forwardRef(
  (
    {
      data,
      query,
      variables,
      title,
      setData,
      setSelection,
      max,
      aliased,
      onClose,
      cancelButtonText,
      // cancelButtonFunction
      offset,
      initialSelection,
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredList, setFilteredList] = useState(data);
    const debounceQuery = useDebounce(searchQuery, 300);
    const [inputRef, setInputFocus] = useFocus();
    const [selected, setSelected] = useState(
      !!initialSelection ? initialSelection : new Map(),
    );
    const [count, setCount] = useState(0);
    const didSetList = useRef(false);
    let aliases = {};
    // used to prevent the interests from being queried right away when visiting MyProfile
    const verifiedQuery = query ? query : NULL;
    const result = useQuery(verifiedQuery, {
      skip: query == undefined,
      variables: variables,
    });

    // TODO: Problematic piece of code, resets data on every render i'm not sure why
    if (query) {
      data = [];
      if (!result.loading && !result.error) {
        data = result.data[title];
        if (!didSetList.current) {
          didSetList.current = true;
          setFilteredList(data);
        }
      }
    }

    const onSelect = React.useCallback(
      item => {
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
          newData = data.filter(
            item =>
              item.name.toLowerCase().includes(lowerCaseQuery) ||
              item.aliases.filter(alias =>
                alias.toLowerCase().includes(lowerCaseQuery),
              ).length !== 0,
          );
        } else {
          newData = data.filter(item =>
            item.name.toLowerCase().includes(lowerCaseQuery),
          );
        }
      } else {
        newData = data.filter(item =>
          item.toLowerCase().includes(lowerCaseQuery),
        );
      }
      setFilteredList(newData);
    }, [debounceQuery]);

    const renderItem = ({ item }) => {
      const isSelected = !!selected.get(item);
      return (
        <TouchableOpacity
          onPress={() => onSelect(item)}
          style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.item}>{query ? data[item].name : item}</Text>
          {isSelected ? (
            <Icon name={"check"} style={styles.icon} size={28} />
          ) : null}
        </TouchableOpacity>
      );
    };

    const search = (
      <SearchBar
        ref={inputRef}
        placeholder={"Search for " + title + "..."}
        onChangeText={q => setSearchQuery(q)}
        text={searchQuery}
        hideBackground={true}
        onCancelButtonPress={() => {
          ref.current.close();
          console.log("close1");
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
          // TODO: CHECK THE LINE BELOW
          // displays the wrong search results even though the search filter is working fine
          // I changed it to:
          // data: query ? (filteredList ? filteredList.map(item=>item.id) : []) : data,
          // which fixed it when aliasing is off and when that initial if (query) block of code didn't execute all the time
          data: query
            ? filteredList
              ? Object.keys(filteredList)
              : []
            : filteredList,
          keyExtractor: item => item,
          renderItem: renderItem,
          marginTop: 10,
          ItemSeparatorComponent: ItemSeparator,
          extraData: selected,
        }}
        tapGestureEnabled={false}
        HeaderComponent={search}
        onOpened={setInputFocus}
        onClose={() => {
          if (setData) {
            setData(mapToString(selected, data, query));
          }
          if (setSelection) {
            setSelection(mapToIds(selected, data, query));
          }
          if (onClose) {
            onClose();
          }
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
  separator: {
    height: 0.5,
    backgroundColor: colours.text02,
    marginLeft: 15,
    marginRight: 15,
  },
  icon: {
    alignSelf: "center",
    color: colours.accent,
    marginRight: 18,
  },
  done: {
    width: "85%",
    alignSelf: "center",
    zIndex: 4,
  },
});

function mapToString(map, data, query) {
  let array = [];
  map.forEach((value, key) => {
    if (value) {
      array.push(query ? data[key].name : key);
    }
  });
  return array;
}

function mapToIds(map, data, query) {
  console.log(map);
  let array = [];
  map.forEach((value, key) => {
    if (value) {
      array.push(query ? data[key].id : key);
    }
  });
  return array;
}

export default SearchableFlatList;
