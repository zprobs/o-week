import React from 'react';
import { FlatList, ListRenderItem, View, ViewStyle } from 'react-native';
import { getDetailedGroup_group_trophies } from '@graphql/types/getDetailedGroup';
import TrophyCard from '@components/card/TrophyCard';

interface Props {
  data: getDetailedGroup_group_trophies[];
  style?: ViewStyle;
}

/**
 * List of TrophyCard
 */
const TrophyList: React.FC<Props> = ({ data, style }) => {
  const renderItem: ListRenderItem<getDetailedGroup_group_trophies> = ({
    item,
  }) => {
    const { id, name } = item;
    return <TrophyCard name={name || 'Unnamed'} key={id} />;
  };

  const Header = () => <View style={{ width: 20 }} />;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      style={{ ...style, flexGrow: 0 }}
      ListHeaderComponent={Header}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default TrophyList;
