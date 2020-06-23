import React, { useEffect, useMemo, useState, useRef } from "react";
import { Text, View, StyleSheet, SectionList, Button } from "react-native";
import SearchBar from "react-native-search-bar";
import Fonts from "../../theme/Fonts";
import { useQuery } from "@apollo/react-hooks";
import { GET_PAGINATED_USERS } from "../../graphql";
import Error from "../ReusableComponents/Error";
import { useDebounce } from "../Modal/SearchableFlatList";
import UserCard from "../ReusableComponents/UserCard";

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

    const listData = useMemo(() => [
        {
            title: "Users",
            data: filteredData ? filteredData.users : []
        },
        {
            title: "Orientation Groups",
            data: ["GROUP A", "GROUP B", "GROUP C"]
        },
        {
            title: "Other Groups",
            data: ["GROUP A", "GROUP B", "GROUP C"]
        },
        {
            title: "Events",
            data: ["EVENT A", "EVENT B"]
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

    return (
      <>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search for users or groups..."
          hideBackground={true}
        />
        <SectionList
          sections={listData}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
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
    if (section.title === 'Users') return <UserCard name={item.name} image={"https://reactjs.org/logo-og.png"} userId={item.id} style={styles.userCard}  />;
    return <Item title={item}/>
};


const renderSectionHeader = ({section: {title}}) => (
    <Text style={styles.header}>{title}</Text>
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
    header: {
        ...FontSizes.SubHeading,
        ...FontWeights.Bold,
        backgroundColor: "#fff",
        padding: 5
    },
    title: {
        ...FontSizes.Caption,
        ...FontWeights.Regular
    },
    userCard: {
        marginVertical: 7,
        marginLeft: 5
    }
});


