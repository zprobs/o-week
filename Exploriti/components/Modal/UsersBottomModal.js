import React, { useContext } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import UserCard from '../ReusableComponents/UserCard';
import { Theme } from '../../theme/Colours';
import EmptyConnections from '../../assets/svg/empty-connections.svg';
import ImgBanner from '../ReusableComponents/ImgBanner';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_USER_FRIENDS, GET_USERS_BY_ID } from '../../graphql';
import { showMessage } from 'react-native-flash-message';
import { AuthContext, processWarning, refreshToken } from '../../context';
import { useSafeArea } from 'react-native-safe-area-context';

const { colours } = Theme.light;
const window = Dimensions.get('window').height;
const window05 = window * 0.05;

/**
 * List modal of users
 * @param name {string} the name of user other than the current user. Do not include if current user
 * @param userId {string} userId of the user
 * @param data What is shown in the Flatlist. An array of Strings representing userIds
 * @param type {string} Type = Friends when the component is rendering the users that a user is friends with
 * @param onPress {function} an optional onPress() for if you don't want to navigate to profile
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly data?: *, readonly type?: *, readonly viewMode?: *, readonly handle?: *}> & React.RefAttributes<unknown>>}
 */
const UsersBottomModal = React.forwardRef(
  ({ name, userId, type, onPress, idArray }, ref) => {
    // use Lazy Query so that it is not executed unless opened
    const [
      getUsers,
      { data: userData, loading, error, called },
    ] = useLazyQuery(GET_USER_FRIENDS, { variables: { userId: userId }, skip: idArray });

    const [getUsersByID, {data: arrayData, error: arrayError, called: arrayCalled}] = useLazyQuery(GET_USERS_BY_ID, {variables: {_in: idArray}, skip: userId})

    const insets = useSafeArea()


    if (error) {
        processWarning(error, 'Server Error')
     }

    let heading;
    let subHeading;

    if (type === 'Friends') {
      heading = 'Friends';
      if (name) {
        subHeading = `People ${name} is friends with`;
      } else {
        subHeading = 'People you are friends with';
      }
    } else if (type === 'invite') {
      heading = 'Invite';
      subHeading = 'Invite someone you know';
    } else if (type === 'chat') {
      heading = 'Chat Participants'
      subHeading = `Members of ${name ? name : 'this chat'}`;
      console.log(subHeading)
    }

    const listEmptyComponent = () => (
      <ImgBanner
        Img={EmptyConnections}
        placeholder="No users found"
        spacing={0.16}
      />
    );

    const renderItem = ({ item }) => {
      console.log('item', item)
      const { id, image, name } = userId ? item.friend : item;
      return (
        <UserCard
          userId={id}
          image={image}
          name={name}
          key={id}
          style={styles.userCard}
          onPress={onPress}
        />
      );
    };

    const header = () => (
      <ModalHeader heading={heading} subHeading={subHeading} />
    );
    const listContainer = styles.listContainer;

    const onOpen = () => {
      console.log('onOpen', idArray, arrayCalled)
      if (idArray) {
        if (!arrayCalled) getUsersByID();
      } else if (userId) {
        if (!called) getUsers();
      }
    }

    console.log('arrayData', arrayData)

    return (
      <Modalize
        ref={ref}
        modalStyle={styles.container}
        flatListProps={{
          showsVerticalScrollIndicator: false,
          data: userId ? userData ? userData.user.friends : null : arrayData ? arrayData.users : null ,
          ListEmptyComponent: listEmptyComponent,
          keyExtractor: userId ? item => item.friend.id : item => item.id,
          style: {flex: 1, marginBottom: 70 + insets.bottom},
          renderItem: renderItem,
          ListHeaderComponent: header,
          bounces: false,
        }}
        onOpen={onOpen}
        disableScrollIfPossible={true}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 20,
    backgroundColor: colours.base,
  },
  content: {
    flex: 1,
    paddingBottom: window05,
  },
  listItemContainer: {
    width: '106%',
  },
  listContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userCard: {
    marginVertical: 7,
  },
});

export default UsersBottomModal;
