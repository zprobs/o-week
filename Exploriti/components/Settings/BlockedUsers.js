import React, { useContext } from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_USER_BLOCKS, UNBLOCK_USER } from '../../graphql';
import { AuthContext, processWarning } from '../../context';
import Icon from 'react-native-vector-icons/Feather';
import query from 'apollo-cache-inmemory/lib/fragmentMatcherIntrospectionQuery';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

const BlockedUsers = () => {
  const { authState } = useContext(AuthContext);
  const { data, loading, error } = useQuery(GET_USER_BLOCKS, {
    variables: { id: authState.user.uid }, fetchPolicy: 'cache-and-network'
  });

  const [unBlock, { error: unBlockError }] = useMutation(UNBLOCK_USER);

  console.log('blocksData', data);

  if (error) processWarning(error, 'Could not retrieve users');

  const emptyList = () => (
    <View style={styles.centerView}>
      <Text style={styles.centerText}>Blocked users will appear here</Text>
      <Text style={styles.centerText}>You haven't blocked anyone yet</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.userByBlockedid.name}</Text>
      <Icon
        name={'minus-circle'}
        size={24}
        onPress={() =>
          unBlock({
            variables: {
              blockerId: authState.user.uid,
              blockedId: item.userByBlockedid.id,
            },
            refetchQueries: [
              { query: GET_USER_BLOCKS, variables: { id: authState.user.uid } },
            ],
          })
        }
      />
    </View>
  );

  return (
    <FlatList
      data={data ? data.user.blocker : null}
      renderItem={renderItem}
      ListEmptyComponent={emptyList}
      style={styles.list}
      contentContainerStyle={
        data ? (data.user.blocker.length ? null : { flex: 1 }) : { flex: 1 }
      }
    />
  );
};

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  centerText: {
    ...FontSizes.Caption,
    ...FontWeights.Light,
  },
  list: {
    flex: 1,
    backgroundColor: colours.base,
    // height: Dimensions.get('window').height
  },
  item: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemText: {
    ...FontSizes.Label,
    ...FontWeights.Regular,
  },
});

export default BlockedUsers;
