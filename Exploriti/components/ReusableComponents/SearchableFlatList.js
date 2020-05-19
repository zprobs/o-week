import React, {useState, useEffect} from 'react';
import {View, FlatList, Text } from 'react-native';

/**
 * A Vertical FlatList component with a search-bar at the top. Used for long lists
 * @param data an Array of data to be displayed in the List
 * @returns {*}
 * @constructor
 */
export default function SearchableFlatList({data}) {

    const [query, setQuery] = useState('');
    const [filteredList, setFilteredList] = useState(data);
    const debounceQuery = useDebounce(query, 300);

    useEffect(() => {
        const lowerCaseQuery = debounceQuery.toLowerCase();
        const newData = data.filter((item) => item.lowerCaseName.includes(lowerCaseQuery));

        setFilteredList(newData);
    }, [debounceQuery]);

    return (
        <View>
            <SearchBar
                placeholder="Search your countries..."
                onChangeText={setQuery}
                value={query}
            />
            <FlatList
                keyExtractor={(item, index) => `${index}`}
                data={filteredList}
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />
        </View>
    );
}

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

