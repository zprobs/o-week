import React, { useEffect, useMemo, useState, useRef } from "react";
import {Text, View, StyleSheet, SectionList, Button, TouchableOpacity} from 'react-native';
import SearchBar from "react-native-search-bar";
import Fonts from "../../theme/Fonts";
import { useQuery } from "@apollo/react-hooks";
import { GET_PAGINATED_USERS } from "../../graphql";
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
            data: [{title: "Orientation Crew", image: "https://pbs.twimg.com/media/Cp_8X1nW8AA2nCj.jpg", count: 13}, {title: 'Nursing Group 1', image: "https://reporter.mcgill.ca/wp-content/uploads/2019/08/frosh_2019-930x620.jpg", count: 9 }]
        },
        {
            title: "Other Groups",
            data: [{title: 'Sports Trivia', image: "https://img.bleacherreport.net/img/slides/photos/004/240/062/hi-res-86cdc18008aa41ad7071eca5bad03f87_crop_exact.jpg?w=2975&h=2048&q=85", count: 9 }]
        },
        {
            title: "Events",
            data: [{title: "Registration", count: 56, image: "https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg"}, {title: "Welcome Fest", count: 7, image: "https://www.omnihotels.com/-/media/images/hotels/mondtn/activities/mondtn-edifici-classici-universit%C3%A0.jpg?h=661&la=en&w=1170"}, {title: "Scavenger Hunt", count: 14, image: "https://reporter.mcgill.ca/wp-content/uploads/2018/10/McGill-fall-2018-web-930x620.jpg" }, {title: "Taking Care of Business", count: 4, image: "https://www.metromba.com/wp-content/uploads/2015/09/Rotman-Sept-2012-41-Smaller-e1443470483451-300x150.jpg"  } ]
        }
    ],[filteredData]);

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
            section.title === 'Events' ||
            section.title === 'Other Groups'
        ) {
            console.log('nav', navigation)
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
                    <ImageCard item={item} />
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


