import React, {useContext, useMemo} from 'react';
import {Text, View, StyleSheet, SectionList, Image, StatusBar, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../context';
import {Theme, ThemeStatic} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import {useQuery} from '@apollo/react-hooks';
import {GET_CURRENT_USER} from '../../graphql';
import ButtonColour from '../ReusableComponents/ButtonColour';
import Icon from 'react-native-vector-icons/EvilIcons';
import SectionHeader from '../ReusableComponents/SectionHeader';
import { useNavigation } from "@react-navigation/native";
import UserCountPreview from '../ReusableComponents/UserCountPreview';

const {colours} = Theme.light;
const {FontWeights, FontSizes} = Fonts

/**
 * Dashboard is the main view where the user can see what is important and what they need to know for the near future
 * @returns The UI view for Dashboard
 * @constructor
 */
export default function Dashboard() {
    const {authState} = useContext(AuthContext);
    const navigation = useNavigation();
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
            data: [{title: "My Frosh Group", img: "https://www.mcgill.ca/firstyear/files/firstyear/frosh_2019.jpg"}, {title: 'Sports Trivia', img: "https://www.tronsmart.com/img/cms/Blog/10%20celebration%20-%20football/9%20.jpg" }]
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
          onPress={()=>{
              StatusBar.setBarStyle('light-content')
              navigation.navigate('Schedule')
          }}
        />
      </>
    );

    const renderItem = React.useCallback(({ item, section }) => {
        if (section.title === "Groups") {
            return (
                <TouchableOpacity onPress={() => navigation.navigate("GroupScreen")}>
                    <View style={styles.imageRow}>
                        <Image source={{ uri: item.img }} style={styles.groupImage} />
                        <View style={styles.imageLabelContainer}>
                            <View style={styles.imageLabel}>
                                <Text style={styles.imageLabelText}>{item.title}</Text>
                            </View>
                            <UserCountPreview />
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
        return <Item title={item} />;
    }, [navigation]);



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
    imageRow: {
       flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    groupImage: {
       height: 150,
        width: '100%',
        borderRadius: 30,
        marginHorizontal: 5
    },
    imageLabelContainer: {
        position: 'absolute',
        bottom: 28,
        width: '85%',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    imageLabel: {
       backgroundColor: ThemeStatic.white,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center'
    },
    imageLabelText: {
       ...FontWeights.Bold,
        ...FontSizes.Body,
        paddingHorizontal: 13,
    },

});
