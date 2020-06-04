import React, {useMemo, useState} from 'react';
import { Text, View, StyleSheet, SectionList} from 'react-native';
import SearchBar from 'react-native-search-bar';
import Fonts from '../../theme/Fonts';
import {useQuery} from '@apollo/react-hooks';
import {GET_ALL_USERS, GET_USER} from '../../graphql';
import Error from '../ReusableComponents/Error';

const {FontWeights, FontSizes} = Fonts;

export default function Search() {
    const [query, setQuery] = useState();
   // const [filteredData, setFilteredData] = useState({users: {}});

    const { loading, error, data } = useQuery(GET_ALL_USERS);

    const DATA = useMemo(() => [
        {
            title: "Users",
            data: data ? data.users : null
        },
        {
            title: "Orientation Groups",
            data: ["French Fries", "Onion Rings", "Fried Shrimps"]
        },
        {
            title: "Other Groups",
            data: ["Water", "Coke", "Beer"]
        },
        {
            title: "Events",
            data: ["Cheese Cake", "Ice Cream"]
        }
    ],[data]);

    if (loading) return <Text>Loading...</Text>
    if (error) return  <Error e={error}/>










    return (
        <>
        <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder='Search for users or groups...'
            hideBackground={true}

        />
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
    </>
    );
}

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const renderItem = ({item, section}) => {
    if (section.title === 'Users') return <Item title={item.name} />;
    return <Item title={item}/>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        ...FontSizes.SubHeading,
        ...FontWeights.Regular,
        backgroundColor: "#fff"
    },
    title: {
        ...FontSizes.Caption,
        ...FontWeights.Regular
    }
});


