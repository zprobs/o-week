import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import Icon from 'react-native-vector-icons/Feather';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

/**
 * a card to show an orientation group's rank in competition.
 * @param style
 * @param onPress {function}
 * @param rank {string} the rank, ex: "1st" or "3rd"
 * @param gold {boolean} background color. true = gold, false  = white
 * @param points {int}
 * @returns {*}
 * @constructor
 */

const RankCard = ({ style, onPress, rank, gold, points }) => {
  const Content = () => (
    <>
      <View style={styles(gold).ring} />
      <View style={styles(gold).row}>
        <Text style={styles(gold).place}>{rank}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 22 }}>
            <Text style={styles(gold).label}>Team Tag</Text>
            <Text style={styles(gold).text}>Broncos</Text>
          </View>
          <View>
            <Text style={styles(gold).label}>Points</Text>
            <Text style={styles(gold).text}>{points.toLocaleString()}</Text>
          </View>
        </View>
      </View>
      <View style={styles(gold).moreInfo}>
        <Text style={styles(gold).moreInfoText}>MORE INFO</Text>
        <Icon
          name={'chevron-right'}
          color={gold ? colours.white : '#000'}
          size={16}
        />
      </View>
    </>
  );

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {gold ? (
        <LinearGradient
          colors={['rgb(247, 190, 100)', 'rgb(244, 166, 4)']}
          style={styles(gold).container}>
          <Content />
        </LinearGradient>
      ) : (
        <View style={{ ...styles().container, backgroundColor: 'white' }}>
          <Content />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = (gold) =>
  StyleSheet.create({
    container: {
      borderRadius: 15,
      overflow: 'hidden',
      height: HEIGHT * 0.2,
      elevation: 4
    },
    ring: {
      position: 'absolute',
      top: -30,
      left: -100,
      height: '130%',
      width: '70%',
      borderRadius: WIDTH * 0.7,
      borderWidth: 18,
      borderColor: gold ? colours.white : '#000',
      borderStyle: 'solid',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      alignItems: 'center',
    },
    place: {
      ...FontSizes.SuperHeading,
      ...FontWeights.Bold,
      color: gold ? colours.white : '#000',
    },
    label: {
      ...FontWeights.Bold,
      ...FontSizes.Body,
      color: gold ? colours.white : '#000',
      opacity: 0.7,
    },
    text: {
      ...FontSizes.Label,
      ...FontWeights.Bold,
      color: gold ? colours.white : '#000',
    },
    moreInfo: {
      flexDirection: 'row',
      position: 'absolute',
      right: 20,
      bottom: 20,
    },
    moreInfoText: {
      ...FontWeights.Bold,
      ...FontSizes.Caption,
      color: gold ? colours.white : '#000',
      marginHorizontal: 12,
    },
  });

export default RankCard;
