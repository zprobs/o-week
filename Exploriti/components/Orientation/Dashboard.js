import React, {useContext, useMemo} from 'react';
import {Text, View, StyleSheet, SectionList, Image, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import {AuthContext} from '../../context';
import {Theme, ThemeStatic} from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import {useQuery} from '@apollo/react-hooks';
import {GET_ALL_EVENTS, GET_CURRENT_USER, GET_USERS_WHERE} from '../../graphql';
import ButtonColour from '../ReusableComponents/ButtonColour';
import Icon from 'react-native-vector-icons/EvilIcons';
import SectionHeader from '../ReusableComponents/SectionHeader';
import { useNavigation } from "@react-navigation/native";
import ImageCard from '../ReusableComponents/ImageCard';


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

    // for demo purposes only, In actual app GET_CURRENT_USER will return a list of user events
    const {loading: eventLoading, error: eventError, data: eventData} = useQuery(GET_ALL_EVENTS);

    if (loading) {
      return null;
    }

    if (error || eventError) {
      return <Text>{error.message}</Text>;
    }

    const listData = useMemo(() => [
        {
            title: "Groups",
            data: [{name: "Orientation Crew", image: "https://pbs.twimg.com/media/Cp_8X1nW8AA2nCj.jpg", attendees_aggregate: {aggregate: {count: 13}}, members: [{user: {image: "https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/IMG_1166.JPG?alt=media&token=e97fc524-8c29-4063-96d6-aa059ae1c153"}}, {user: {image: "https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/IMG_1165.JPG?alt=media&token=22568f2b-19fd-4f63-b37d-8e1c3f95977f"}}, {user: {image: "https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/IMG_1170.JPG?alt=media&token=14078fa2-f2e4-4f39-852a-2c3092e29ed5"}} ] }, {name: 'Sports Trivia', image: "https://img.bleacherreport.net/img/slides/photos/004/240/062/hi-res-86cdc18008aa41ad7071eca5bad03f87_crop_exact.jpg?w=2975&h=2048&q=85", attendees_aggregate: {aggregate: {count: 9}}, members: [{user: {image: "https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/IMG_1166.JPG?alt=media&token=e97fc524-8c29-4063-96d6-aa059ae1c153"}}, {user: {image: "https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/IMG_1165.JPG?alt=media&token=22568f2b-19fd-4f63-b37d-8e1c3f95977f"}}, {user: {image: "https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/IMG_1170.JPG?alt=media&token=14078fa2-f2e4-4f39-852a-2c3092e29ed5"}} ] }]
        },
        {
            title: "Events",
            data: eventData ? eventData.events : []
        }
    ],[eventData]);

    const Arrow = () => (
        <Icon name={'arrow-right'} color={ThemeStatic.white} size={28}/>
    )

    const Header = () => {
        const {data : sayHiData} = useQuery(GET_USERS_WHERE, {variables: {_nin: authState.user.uid }})
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
              navigation.navigate('Schedule')
          }}
        />
          </View>
      </>
        );
    };

    const renderItem = React.useCallback(({ item, section }) => {
        let screen, options
        const images = [];
        if (section.title === "Groups") {
            screen = "GroupScreen"
            options = {group: item}
            item.members.map((member) => {
                images.push(member.user.image);
            })
        } else {
            screen = "EventScreen"
            options = {event: item}
            item.attendees.map((attendee) => {
                images.push(attendee.user.image);
            })
        }
            return (
                <TouchableOpacity onPress={() => navigation.navigate(screen, options)}>
                   <ImageCard item={item} images={images} />
                </TouchableOpacity>
            );
    }, [navigation]);



    return (
        <View style={styles.container}>
            {
                eventLoading ? <Text>Loading...</Text>
                    :
                    <SectionList
                        sections={listData}
                        keyExtractor={(item, index) => item + index}
                        renderItem={renderItem}
                        renderSectionHeader={SectionHeader}
                        ListHeaderComponent={Header}
                        showsVerticalScrollIndicator={false}
                    />
            }
        </View>
    );
}






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
    },


});
