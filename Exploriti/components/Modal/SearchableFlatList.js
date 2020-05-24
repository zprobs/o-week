import React, {useState, useEffect, createRef, useRef} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from 'react-native-search-bar';
import {Modalize} from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import {Theme} from '../../theme/Colours';
import Icon from 'react-native-vector-icons/EvilIcons';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts;

/**
 * A Vertical FlatList component with a search-bar at the top. Used for long lists
 * @param data an Array of data to be displayed in the List
 * @param title The word to be placed inside the search-bar placeholder in the form: Search for {title}...
 * @param setData the function or set method to change the selection of the data in root component
 * @returns {*}
 * @constructor
 */
const SearchableFlatList = React.forwardRef(({data, title, setData}, ref) => {

    const [query, setQuery] = useState('');
    const [filteredList, setFilteredList] = useState(data);
    const debounceQuery = useDebounce(query, 300);
        const [inputRef, setInputFocus] = useFocus();
        const [selected, setSelected] = useState(new Map());
        const [count, setCount] = useState(0);

        const onSelect = React.useCallback(
            item => {
                const newSelected = new Map(selected);
                console.log(selected.get(item));
                if (selected.get(item) === false || selected.get(item) == undefined) {
                    if (count >= 4) {return}
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
        const newData = data.filter((item) => item.toLowerCase().includes(lowerCaseQuery));

        setFilteredList(newData);
    }, [debounceQuery]);



    const renderItem = ({item}) => {
         const isSelected = !!selected.get(item);
         return (
        <TouchableOpacity onPress={() => onSelect(item)} style={{flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.item}>{item}</Text>
            {isSelected ? <Icon name={"check"} style={styles.icon} size={28}/> : null }
        </TouchableOpacity>

         );

    };

    const search = (
        <SearchBar
            ref={inputRef}
            placeholder={"Search for " + title + "..."}
            onChangeText={(q)=>setQuery(q)}
            text={query}
           // onSearchButtonPress={()=>{console.log('search')}}
            hideBackground={true}
            onCancelButtonPress={()=>ref.current.close()}
            cancelButtonText={"Done"}
            showsCancelButton={true}
        />
        );

    const ItemSeparator = () => {
       return( <View style={styles.separator}/>);
    };

    return (

            <Modalize
                ref={ref}
                flatListProps={{
                    data: filteredList,
                    keyExtractor: item => item,
                    renderItem: renderItem,
                    marginTop: 10,
                    ItemSeparatorComponent: ItemSeparator,
                    extraData: selected,
                 }}
                tapGestureEnabled={false}
                HeaderComponent={search}
                onOpened={setInputFocus}
                onClose={()=>setData(mapToString(selected))}

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

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ]
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
        marginRight: 15

    },
    icon: {
        alignSelf: 'center',
        color: colours.accent,
        marginRight: 18
    },
    done: {
        width: '85%',
        alignSelf: 'center',
        zIndex: 4,
    },
});

function mapToString(map) {
    let array = [];
   map.forEach(
       (value, key) => {
           if (value) {
               array.push(key);
           }
       }
   );
   console.log('Map: ')
   console.log(array);
   return array;
}


export default SearchableFlatList;

