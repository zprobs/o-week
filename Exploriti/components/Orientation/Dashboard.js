import React, {useContext, useMemo} from 'react';
import {Text, View, StyleSheet, SectionList, Image, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import {AuthContext} from '../../context';
import {Theme, ThemeStatic} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import {useQuery} from '@apollo/react-hooks';
import {GET_CURRENT_USER, GET_USERS_WHERE} from '../../graphql';
import ButtonColour from '../ReusableComponents/ButtonColour';
import Icon from 'react-native-vector-icons/EvilIcons';
import SectionHeader from '../ReusableComponents/SectionHeader';
import { useNavigation } from "@react-navigation/native";
import UserCountPreview from '../ReusableComponents/UserCountPreview';
import LinearGradient from 'react-native-linear-gradient';


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
            data: [{title: "Orientation Crew", img: "https://www.mcgill.ca/firstyear/files/firstyear/frosh_2019.jpg", count: 13}, {title: 'Sports Trivia', img: "https://www.tronsmart.com/img/cms/Blog/10%20celebration%20-%20football/9%20.jpg", count: 9 }]
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

    const Header = () => {
        const {data : sayHiData, loading, error} = useQuery(GET_USERS_WHERE, {variables: {_nin: authState.user.uid }})
        let count = 0;

        return (
      <>
          <View style={{marginHorizontal: 25}}>
              <Text style={styles.welcomeTitle}>
                  Hi, {data.user.name}!
              </Text>
              <Text style={styles.welcomeSubTitle}>Say hi to someone new:</Text>
          </View>
          <ScrollView horizontal={true} style={styles.userScrollView} showsHorizontalScrollIndicator={false}>
              {
                  sayHiData ? sayHiData.users.map((user)=> {
                      count++;
                      return (
                          <TouchableOpacity onPress={()=>navigation.push('Profile', {userId: user.id})} key={user.id}>
                              <Image source={{uri: user.image}} style={{...styles.userImage, marginTop: (count%2===0 ? 16 : 0)}} key={user.id}/>
                          </TouchableOpacity>
                      );
                      }
                  ) : null
              }
          </ScrollView>
          <View style={{marginHorizontal: 25}}>
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
          </View>
      </>
        );
    };

    const renderItem = React.useCallback(({ item, section }) => {
        if (section.title === "Groups") {
            return (
                <TouchableOpacity onPress={() => navigation.navigate("GroupScreen")}>
                    <View style={styles.imageRow}>
                        <Image source={{ uri: item.img }} style={styles.groupImage} />
                            <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} locations={[0, 0.9]} style={styles.imageLabelContainer}>
                                <UserCountPreview count={item.count} />
                                <Text style={styles.imageLabelText}>{item.title}</Text>
                            </LinearGradient>
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
       backgroundColor: colours.base,
   },
    welcomeTitle: {
       ...FontWeights.Bold,
        ...FontSizes.Heading,
        color: colours.text03,
        marginTop: 30
    },
    welcomeSubTitle: {
       ...FontSizes.Label,
        ...FontWeights.Regular,
        color: colours.text02,
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
        padding: 5,
    },
    imageRow: {
       flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 25
    },
    groupImage: {
       height: 180,
        width: '100%',
        borderRadius: 30,
        marginHorizontal: 5
    },
    imageLabelContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        justifyContent: 'center',
        paddingLeft: 25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 8


    },
    imageLabelText: {
       ...FontWeights.Bold,
        ...FontSizes.Label,
        marginTop: 5,
        color: colours.white,
    },
    userScrollView: {
       marginBottom: 10,
        marginTop: 24,
        width: '100%',
        flexDirection: 'row',
    },
    userImage: {
       width: 66,
        height: 66,
        borderRadius: 33,
        marginHorizontal: 8,
        backgroundColor: colours.placeholder
    }

});
