import React from 'react';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import {Theme} from '../../theme/Colours';

const {FontWeights, FontSizes} = Fonts;
const {colours} = Theme.light

const HEIGHT = Dimensions.get('window').height;

const GroupInfoModal = React.forwardRef(({prop}, ref) => {
    return (
      <Modalize
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles.container}
      alwaysOpen={HEIGHT*0.62}
      snapPoint={900}
      modalTopOffset={110}
      >
          <Text style={styles.leaderBoardText}>LeaderBoard</Text>
          <View style={styles.leaderBoardView}>
              <View style={styles.pointsView}>
                  <Text style={styles.pointsText}>21,975 Points!</Text>
                  <Text>3rd Place</Text>
              </View>
              <View style={styles.trophyView}>
                <View style={styles.seeTrophiesView}>
                    <Text style={styles.seeTrophiesText}>SEE TROPHIES</Text>
                </View>
              </View>

          </View>

      </Modalize>
    );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  leaderBoardText: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    color: colours.text01,
    marginTop: 20,
  },
  leaderBoardView: {
    backgroundColor: colours.placeholder,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  pointsView: {
    justifyContent: "center",
  },
    pointsText : {
      ...FontSizes.SubHeading,
        ...FontWeights.Bold,
        marginTop: 10


    },
    placeText: {

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
    }
});

export default GroupInfoModal;
