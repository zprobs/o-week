import React from 'react';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import {Theme, ThemeStatic} from '../../theme/Colours';
import DetailedUserList from '../ReusableComponents/DetailedUserList';

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light

const HEIGHT = Dimensions.get('window').height;

const GroupInfoModal = React.forwardRef(({prop}, ref) => {
    return (
      <Modalize
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false, bounces: false }}
      alwaysOpen={HEIGHT*0.5}
      modalTopOffset={110}
      rootStyle={[StyleSheet.absoluteFill,  {minHeight: HEIGHT*0.4} ]}
      >
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
          <DetailedUserList data={tempData} style={styles.detailedUserList}/>
      </Modalize>
    );
});

const tempData = [{name: "Anita", id: "1", isLeader: true}, {name: "Kevin", id: "2", isLeader: false}, {name: "Paul", id: "3", isLeader: false}];

const styles = StyleSheet.create({
  sectionText: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    color: colours.text01,
    marginTop: 25,
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

});

export default GroupInfoModal;
