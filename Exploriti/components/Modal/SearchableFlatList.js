import React, {useState, useEffect, createRef, useRef} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from 'react-native-search-bar';
import {Modalize} from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import {Theme} from '../../theme/Colours';
import Icon from 'react-native-vector-icons/EvilIcons';
import ButtonColour from '../ReusableComponents/ButtonColour';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts;

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
        const [selected, setSelected] = useState(new Map());

        const onSelect = React.useCallback(
            item => {
                const newSelected = new Map(selected);
                newSelected.set(item, !selected.get(item));

                setSelected(newSelected);
            },
            [selected],
        );




        useEffect(() => {
        const lowerCaseQuery = debounceQuery.toLowerCase();
        const newData = data.filter((item) => item.toLowerCase().includes(lowerCaseQuery));

        setFilteredList(newData);
        if (searchRef.current !== undefined) {searchRef.current.focus();}
    }, [debounceQuery]);



    const renderItem = ({item}) => {
         const isSelected = !!selected.get(item);
         return (
        <TouchableOpacity onPress={() => onSelect(item)} style={{flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.item}>{item}</Text>
            {isSelected ? <Icon name={"check"} style={styles.icon} size={20}/> : null }
        </TouchableOpacity>

         );

    };

    const search = (
        <SearchBar
            ref={searchRef}
            placeholder={"Search for " + title + "..."}
            onChangeText={(q)=>setQuery(q)}
            text={query}
            onSearchButtonPress={()=>{searchRef.current.blur()}}
            showsCancelButton={false}
            showsCancelButtonWhileEditing={false}
            hideBackground={true}
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
                        ListHeaderComponent: search,
                    ListFooterComponent: doneButton,
                    ItemSeparatorComponent: ItemSeparator,
                    extraData: selected,
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

const doneButton =  (
        <ButtonColour colour={colours.accent} containerStyle={styles.done} light={true} label={"Done"}  />
);

export default SearchableFlatList;

