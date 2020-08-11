import React from 'react';
import { FlatList, View } from 'react-native';
import TrophyCard from './TrophyCard';

/**
 * List of TrophyCard
 * @param data
 * @param style
 * @returns {*}
 * @constructor
 */
const TrophyList = ({ data, style }) => {
  const renderItem = ({ item }) => {
    const { id, name } = item;
    return <TrophyCard name={name} id={id} key={id} />;
  };

  const Header = () => <View style={{ width: 20 }} />;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal={true}
      style={{ ...style, flexGrow: 0 }}
      ListHeaderComponent={Header}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default TrophyList;
