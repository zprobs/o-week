import React, { useEffect, useMemo, useState, useRef } from "react";
import { Text, View, StyleSheet, SectionList, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import SearchBar from "react-native-search-bar";
import Fonts from "../../theme/Fonts";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_EVENTS, GET_PAGINATED_USERS, SEARCH_ALL } from '../../graphql';
import Error from "../ReusableComponents/Error";
import { useDebounce } from "../Modal/SearchableFlatList";
import UserCard from "../ReusableComponents/UserCard";
import {Theme} from '../../theme/Colours';
import SectionHeader from '../ReusableComponents/SectionHeader';
import ImageCard from '../ReusableComponents/ImageCard';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../Menu/BackIcon';
import SearchUsers from '../../assets/svg/search-users.svg'
import Svg from 'react-native-svg';
import ImgBanner from '../ReusableComponents/ImgBanner';
import EmptyMessages from '../../assets/svg/empty-messages.svg';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts;

/**
 * Search displays a SectionList containing recommended data of interest to the current user obtained from an API call. It displays users, groups, events
 * and other groups. Has a search functionality which should be able to reach anything on the app.
 * @returns {*}
 * @constructor
 */
export default function Search() {
   const [query, setQuery] = useState(null);
   const debounceQuery = useDebounce(query, 300);
  const firstRenderRef = useRef(true);
  const searchRef = useRef();
  const { loading, error, data } = useQuery(SEARCH_ALL, {variables: {limit: 15, query: `%${query}%`}, skip: firstRenderRef.current || query === ''});
    const navigation = useNavigation();

    const listData = data && (data.users.length > 0 || data.groups.length > 0) ? [
        {
            title: "Users",
            data: data ? data.users : []
        },
        {
            title: "Orientation Groups",
            data: data ? data.groups : []
        },
        // {
        //     title: "Events",
        //     data: eventsData ? eventsData.events : []
        // }
    ] : null;

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
        }
    }, [debounceQuery]);

    useEffect(()=>{
      searchRef.current.focus();
    }, []);

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
                options = {groupId: item.id}
            }
            return (
                <TouchableOpacity onPress={()=>navigation.navigate(screen, options)}>
                    <ImageCard groupId={item.id}  />
                </TouchableOpacity>
            );
        }
        return <Item title={item}/>
    };


    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BackIcon/>
          <View style={{width: '90%'}}>
            <SearchBar
              value={query}
              onChangeText={setQuery}
              placeholder="Search for users, groups or events..."
              hideBackground={true}
              ref={searchRef}
            />
          </View>
        </View>
        <SectionList
          sections={listData}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={SectionHeader}
          style={{backgroundColor: colours.white}}
          ListEmptyComponent={listEmptyComponent}
        />
        </SafeAreaView>
    );
}

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const listEmptyComponent = () => (
  <ImgBanner
    Img={SearchUsers}
    placeholder=""
    spacing={0.15}
  />
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


