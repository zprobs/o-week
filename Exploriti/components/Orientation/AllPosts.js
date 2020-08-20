import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Theme } from '../../theme/Colours';
import { useQuery } from '@apollo/react-hooks';
import Post from '../ReusableComponents/Post';

const { colours } = Theme.light;

const AllPosts = () => {
  const route = useRoute();
  const {groupId} = route.params

  //const {data, error} = useQuery(GET_GROUP_POSTS_PAGINATED)

  const data = [1,2,3,4,5]

  const renderItem = ({item, index}) => (
    <Post index={index} item={item}/>
  )

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem}/>
    </View>
  )
}

export default AllPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base
  }
})
