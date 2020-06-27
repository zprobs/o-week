import React, {useState} from 'react';
import {StyleSheet, Text, Dimensions, View, TouchableOpacity, Image} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import {Theme, ThemeStatic} from '../../theme/Colours';
import DetailedUserList from '../ReusableComponents/DetailedUserList';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import RSVPButton from '../ReusableComponents/RSVPButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons'

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const EventInfoModal = React.forwardRef(({group}, ref) => {

  const Tabs = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'Details' },
      { key: 'second', title: 'Guest List' },
      { key: 'third', title: 'Join' },
    ]);

    const renderScene = SceneMap({
      first: Details,
      second: SecondRoute,
        third: SecondRoute
    });

    const renderTabBar = (props) => {
      return <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: ThemeStatic.delete, width: '16.66%', marginLeft: WIDTH*0.083 }}
          style={styles.tabBar}
          renderLabel={({ route, focused, color }) => (
              <Text style={{ ...styles.tabText, color:  color }}>
                {route.title}
              </Text>
              )}
          activeColor={ThemeStatic.delete}
          inactiveColor={colours.text03}
      />
    }

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: WIDTH}}
            renderTabBar={renderTabBar}
            swipeEnabled={false}
        />
    );
  };


    const Details = () => (
        <>
        <RSVPButton style={styles.rsvp}/>
        <View style={styles.container}>
          <View style={styles.iconView}>
            <Image source={{uri: "https://www.iedp.com/media/1699/rotman-circle-blue.png"}} style={styles.icon} width={32} height={32} borderRadius={16}/>
            <Text style={styles.iconLabel}>Rotman Event</Text>
          </View>
          <View style={styles.iconView}>
            <FeatherIcon  style={styles.icon} name={'calendar'} size={32} color={colours.text03}/>
            <Text style={styles.iconLabel}>September 7th</Text>
          </View>
          <View style={styles.iconView}>
            <FeatherIcon  style={styles.icon} name={'clock'} size={32} color={colours.text03}/>
            <Text style={styles.iconLabel}>3:00 - 4:00PM EST</Text>
          </View>
          <View style={styles.iconView}>
            <FeatherIcon  style={styles.icon} name={'map-pin'} size={32} color={colours.text03}/>
            <Text style={styles.iconLabel}>321 Bloor St. East</Text>
          </View>
          <Text style={styles.sectionText}>Description</Text>
          <Text style={styles.descriptionText}>Taking care of business is an importnant aspect of daily life, and this event will help show you how to fully embrace your conscientious self. We will have a workshop led by the famous Computer Scientist Zachary Probst who will be detailing his life of hard work and how that paid off for him very handsomly. The event is free so make sure to bring a friend or two! There will also be free snacks and refreshments for all courtesy of the Salman Shahid Machine Learning Foundation.  </Text>
        </View>
        </>

    );

  const SecondRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  );




    return (
      <Modalize
        ref={ref}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          bounces: false,
        }}
        alwaysOpen={HEIGHT * 0.5}
        modalTopOffset={110}
        rootStyle={[StyleSheet.absoluteFill, { minHeight: HEIGHT * 0.4 }]}>
        <Tabs />
      </Modalize>
    );
});


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  },
  sectionText: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    color: colours.text03,
    marginTop: 20,
      marginHorizontal: 12,
  },
  descriptionText: {
    ...FontSizes.Body,
    ...FontWeights.Regular,
    color: colours.text03,
    lineHeight: 22,
    marginTop: 15,
    marginHorizontal: 12
  },
    rsvp: {
      alignSelf: 'center',
      marginVertical: 25,
      width: '58%'
    },
  icon: {
    marginHorizontal: 12,
    marginVertical: 10

  },
  iconLabel: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: colours.text03,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  tabBar: {
    backgroundColor: colours.base,
    marginTop: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  tabText: {
    ...FontSizes.Body,
    ...FontWeights.Bold
  }

});

export default EventInfoModal;
