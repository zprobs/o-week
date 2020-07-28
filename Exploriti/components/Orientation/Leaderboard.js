import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import CircleBackIcon from '../Menu/CircleBackIcon';
import RankCard from './RankCard';

const { FontWeights, FontSizes } = Fonts;

const { colours } = Theme.light;

/**
 * Displays a list of Rank cards to rank orientation groups in various competitions
 * @returns {*}
 * @constructor
 */
const LeaderBoard = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <CircleBackIcon />
          <Text style={styles.title}>Leaderboard</Text>
          <View style={{ width: 44 }} />
        </View>
        <FlatList data={places} renderItem={renderItem} style={styles.list} keyExtractor={item=>item} />
      </SafeAreaView>
    </View>
  );
};

const renderItem = ({ item }) => (
  <RankCard
    rank={item}
    style={styles.rankCard}
    key={item}
    gold={item === '3rd'}
    points={110}
  />
);

const places = ['1st', '2nd', '3rd', '4th', '5th'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    ...FontSizes.Heading,
    ...FontWeights.Bold,
    color: colours.text01,
  },
  rankCard: {
    marginVertical: 12,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.6,
    elevation: 3
  },
  list: {
    marginTop: 25,
    paddingHorizontal: 25,
  },
});

export default LeaderBoard;
