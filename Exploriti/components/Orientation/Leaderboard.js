import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import CircleBackIcon from '../Menu/CircleBackIcon';
import RankCard from './RankCard';
import { processError, processWarning, rankData } from '../../context';
import { useQuery } from '@apollo/react-hooks';
import { GET_LEADERBOARD } from '../../graphql';
import { useRoute } from '@react-navigation/native';

const { FontWeights, FontSizes } = Fonts;

const { colours } = Theme.light;

/**
 * Displays a list of Rank cards to rank orientation groups in various competitions
 * @returns {*}
 * @constructor
 */
const LeaderBoard = () => {

  const route = useRoute();
  const {data, loading, error} = useQuery(GET_LEADERBOARD);
  const {groupId} = route.params

  if (error) processWarning(error, 'Cannot load leaderboard');
  if (loading || error) return null

  const renderItem = ({ item, index }) => (
    <RankCard
      rank={rankData[index]}
      style={styles.rankCard}
      gold={item.id === groupId}
      points={item.trophies_aggregate.aggregate.sum.score}
      team={item.name}
    />
  );

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <CircleBackIcon />
          <Text style={styles.title}>Leaderboard</Text>
          <View style={{ width: 44 }} />
        </View>
        <FlatList data={data.groups} renderItem={renderItem} style={styles.list} keyExtractor={item=>item.id} />
      </SafeAreaView>
  );
};

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
