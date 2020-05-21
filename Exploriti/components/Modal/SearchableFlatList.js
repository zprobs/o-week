import React, {useState, useEffect, createRef, useRef} from 'react';
import {View, FlatList, Text } from 'react-native';
import SearchBar from 'react-native-search-bar';
import {Modalize} from 'react-native-modalize';

/**
 * A Vertical FlatList component with a search-bar at the top. Used for long lists
 * @param data an Array of data to be displayed in the List
 * @param title The word to be placed inside the search-bar placeholder in the form: Search for {title}...
 * @returns {*}
 * @constructor
 */
const SearchableFlatList = React.forwardRef(({data, title}, ref) => {

    const [query, setQuery] = useState('');
    const [filteredList, setFilteredList] = useState(data);
    const debounceQuery = useDebounce(query, 300);
    const searchRef = useRef();



    useEffect(() => {
        const lowerCaseQuery = debounceQuery.toLowerCase();
        const newData = data.filter((item) => item.toLowerCase().includes(lowerCaseQuery));

        setFilteredList(newData);
        if (searchRef.current !== undefined) {searchRef.current.focus();}
    }, [debounceQuery]);



    const renderItem = ({item}) => (
        <Text>{item}</Text>
    );

    const search = (
        <SearchBar
            ref={searchRef}
            placeholder={"Search for " + title + "..."}
            onChangeText={(q)=>setQuery(q)}
            text={query}
            onSearchButtonPress={()=>{searchRef.current.blur()}}
        />
        );



    return (

            <Modalize
                ref={ref}
                flatListProps={{
                    data: filteredList,
                    keyExtractor: item => item,
                    renderItem: renderItem,
                    marginTop: 10,
                        ListHeaderComponent: search
                 }}
            />
    );
}
);

/**
 * A custom hook used to delay showing search results in the search bar
 * @param value The value to be returned
 * @param delay The delay in milliseconds
 * @returns value
 */
const useDebounce = (value: any, delay: number) => {
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


export default SearchableFlatList;

