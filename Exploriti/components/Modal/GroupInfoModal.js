import React, {useState} from 'react';
import {StyleSheet, Text, Dimensions, View, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import {Theme, ThemeStatic} from '../../theme/Colours';
import DetailedUserList from '../ReusableComponents/DetailedUserList';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const GroupInfoModal = React.forwardRef(({group}, ref) => {

  const Tabs = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'Overview' },
      { key: 'second', title: 'Second' },
    ]);

    const renderScene = SceneMap({
      first: Overview,
      second: SecondRoute,
    });

    const renderTabBar = (props) => {
      return <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: ThemeStatic.delete, width: '50%' }}
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


    const Overview = () => (
      <>
        <Text style={styles.sectionText}>LeaderBoard</Text>
        <View style={styles.leaderBoardView}>
          <View style={styles.pointsView}>
            <Text style={styles.pointsText}>21,975 Points!</Text>
            <Text style={styles.placeText}>3rd Place</Text>
          </View>
          <View style={styles.trophyView}>
            <View style={styles.seeTrophiesView}>
              <Text style={styles.seeTrophiesText}>SEE MEDALS</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionText}>Members</Text>
        <DetailedUserList data={tempData} style={styles.detailedUserList} />
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

const tempData = [{name: "Anita", id: "1", isLeader: true}, {name: "Kevin", id: "2", isLeader: false}, {name: "Paul", id: "3", isLeader: false}];

const styles = StyleSheet.create({
  sectionText: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    color: colours.text01,
    marginTop: 20,
      marginHorizontal: 20,
  },
  leaderBoardView: {
    backgroundColor: colours.placeholder,
    flexDirection: "row",
    justifyContent: "space-around",
      alignItems: 'center',
    width: "100%",
     paddingVertical: 24,
      marginVertical: 20,
  },
  pointsView: {
    justifyContent: "center",
  },
    pointsText : {
      ...FontSizes.SubHeading,
        ...FontWeights.Bold,

    },
    placeText: {
      ...FontWeights.Bold,
        ...FontSizes.Caption,
        color: colours.text03

    },
  trophyView: {
      justifyContent: "center"
  },
    seeTrophiesView: {
      backgroundColor: colours.text03,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        paddingHorizontal: 8

    },
    seeTrophiesText: {
      ...FontWeights.Bold,
        ...FontSizes.Caption,
        color: colours.white
    },
    detailedUserList: {
      marginTop: 15
    },
  tabBar: {
    backgroundColor: colours.base,
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

export default GroupInfoModal;
