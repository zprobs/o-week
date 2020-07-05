import React, { useEffect, useMemo, useState, useRef } from "react";
import {Text, View, StyleSheet, SectionList, Button, TouchableOpacity} from 'react-native';
import SearchBar from "react-native-search-bar";
import Fonts from "../../theme/Fonts";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_EVENTS, GET_PAGINATED_USERS } from '../../graphql';
import Error from "../ReusableComponents/Error";
import { useDebounce } from "../Modal/SearchableFlatList";
import UserCard from "../ReusableComponents/UserCard";
import {Theme} from '../../theme/Colours';
import SectionHeader from '../ReusableComponents/SectionHeader';
import ImageCard from '../ReusableComponents/ImageCard';
import {useNavigation} from '@react-navigation/native';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts;

/**
 * Search displays a SectionList containing recommended data of interest to the current user obtained from an API call. It displays users, groups, events
 * and other groups. Has a search functionality which should be able to reach anything on the app.
 * @returns {*}
 * @constructor
 */
export default function Search() {
   const [query, setQuery] = useState("");
   const debounceQuery = useDebounce(query, 300);
   const { loading, error, data } = useQuery(GET_PAGINATED_USERS, {variables: {limit: 50}});
  const { loading: eventsLoading, error: eventsError, data: eventsData } = useQuery(GET_ALL_EVENTS);
  const [filteredData, setFilteredData] = useState(data);
   const firstRenderRef = useRef(true);
    const navigation = useNavigation();

    const listData = useMemo(() => [
        {
            title: "Users",
            data: filteredData ? filteredData.users : []
        },
        {
            title: "Orientation Groups",
            data: [{name: "Orientation Crew", image: "https://pbs.twimg.com/media/Cp_8X1nW8AA2nCj.jpg", attendees_aggregate: {aggregate: {count: 13}}, members: [{user: {image: "https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/IMG_1166.JPG?alt=media&token=e97fc524-8c29-4063-96d6-aa059ae1c153"}}, {user: {image: "https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/IMG_1165.JPG?alt=media&token=22568f2b-19fd-4f63-b37d-8e1c3f95977f"}}, {user: {image: "https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/IMG_1170.JPG?alt=media&token=14078fa2-f2e4-4f39-852a-2c3092e29ed5"}} ] }]
        },
        // {
        //     // title: "Other Groups",
        //     // data: [{title: 'Sports Trivia', image: "https://img.bleacherreport.net/img/slides/photos/004/240/062/hi-res-86cdc18008aa41ad7071eca5bad03f87_crop_exact.jpg?w=2975&h=2048&q=85", count: 9 }]
        // },
        {
            title: "Events",
            data: eventsData ? eventsData.events : []
        }
    ],[filteredData, eventsData]);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
        }  else {
            const lowerCaseQuery = debounceQuery.toLowerCase();
                const newData = data.users.filter(user => user.name.toLowerCase().includes(lowerCaseQuery));
                setFilteredData({users: newData});
        }
    }, [debounceQuery]);

    useEffect(()=>{
        setFilteredData(data);
    }, [data]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return  <Error e={error}/>;

    const renderItem = ({item, section}) => {
        if (section.title === 'Users') return <UserCard name={item.name} image={item.image} userId={item.id} style={styles.userCard}  />;
        if (
            section.title === 'Orientation Groups' ||
            section.title === 'Events'
        ) {
            let screen, options;
            if (section.title === "Events") {
                screen = "EventScreen"
                options = {event: item}
            } else {
                screen = "GroupScreen"
                options = {group: item}
            }
            return (
                <TouchableOpacity onPress={()=>navigation.navigate(screen, options)}>
                    <ImageCard item={item}  />
                </TouchableOpacity>
            );
        }
        return <Item title={item}/>
    };
    const Search = (
        <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search for users or groups..."
            hideBackground={true}
        />
    )

    return (
        <SectionList
          sections={listData}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={SectionHeader}
          style={{backgroundColor: colours.white}}
          ListHeaderComponent={Search}
        />
    );
}

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);





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
    title: {
        ...FontSizes.Caption,
        ...FontWeights.Regular
    },
    userCard: {
        marginVertical: 7,
        marginLeft: 5,
    }
});


