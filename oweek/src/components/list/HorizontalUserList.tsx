import React from 'react';
import { FlatList, ListRenderItem, View, ViewStyle } from 'react-native';
import {
  getDetailedGroup_group_members_user,
  getDetailedGroup_group_owners_user,
} from '@graphql/types/getDetailedGroup';
import HorizontalUserCard from '@components/card/HorizontalUserCard';

type Users =
  | getDetailedGroup_group_members_user
  | getDetailedGroup_group_owners_user;

interface Props {
  style: ViewStyle;
  data: Array<Users>;
}

/**
 * List of HorizontalUserCard
 */
const HorizontalUserList: React.FC<Props> = ({ data, style }) => {
  const renderItem: ListRenderItem<Users> = ({ item }) => {
    const { id, name, image } = item;
    return (
      <HorizontalUserCard
        image={image}
        name={name}
        id={id}
        key={id.toString()}
      />
    );
  };

  const Header = () => <View style={{ width: 10 }} />;

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

export default HorizontalUserList;
