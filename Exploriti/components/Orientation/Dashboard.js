import React, {useContext, useMemo} from 'react';
import {Text, View, StyleSheet, SectionList} from 'react-native';
import {AuthContext} from '../../context';
import {Theme, ThemeStatic} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import {useQuery} from '@apollo/react-hooks';
import {GET_CURRENT_USER} from '../../graphql';
import ButtonColour from '../ReusableComponents/ButtonColour';
import Icon from 'react-native-vector-icons/EvilIcons';
import SectionHeader from '../ReusableComponents/SectionHeader';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts

/**
 * Dashboard is the main view where the user can see what is important and what they need to know for the near future
 * @returns The UI view for Dashboard
 * @constructor
 */
export default function Dashboard() {
    const {authState} = useContext(AuthContext);
    const {loading, error, data} = useQuery(GET_CURRENT_USER, {variables: {id: authState.user.uid}});

    if (loading) {
      return <Text>Loading</Text>;
    }

    if (error) {
      return <Text>{error.message}</Text>;
    }

    const listData = useMemo(() => [
        {
            title: "Groups",
            data: ["ONE", "TWO"]
        },
        {
            title: "Events",
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
    ],[]);

    const Arrow = () => (
        <Icon name={'arrow-right'} color={ThemeStatic.white} size={28}/>
    )

    const Header = () => (
      <>
        <Text style={styles.welcomeTitle}>
          Nice to see you, {data.user.name}!
        </Text>
        <Text style={styles.welcomeSubTitle}>What's on your mind?</Text>
        <ButtonColour
          colour={ThemeStatic.delete}
          label={"Check Schedule"}
          Icon={Arrow}
          light={true}
          labelStyle={styles.buttonText}
          containerStyle={styles.scheduleButton}
        />
      </>
    );

    return (
        <View style={styles.container}>
            <SectionList
                sections={listData}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={SectionHeader}
                ListHeaderComponent={Header}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const renderItem = ({item, section}) => {
    return <Item title={item}/>
};


const styles = StyleSheet.create({
   container: {
       flex: 1,
       paddingHorizontal: 25,
       backgroundColor: colours.base
   },
    welcomeTitle: {
       ...FontWeights.Bold,
        ...FontSizes.Heading,
        color: colours.text03,
        marginTop: 30
    },
    welcomeSubTitle: {
       ...FontSizes.Label,
        ...FontWeights.Bold,
        color: ThemeStatic.delete,
        paddingTop: 10
    },
    buttonText :{
       ...FontWeights.Bold,
        ...FontSizes.Body,
        color: ThemeStatic.white,
    },
    scheduleButton: {
       marginVertical: 25
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
});
