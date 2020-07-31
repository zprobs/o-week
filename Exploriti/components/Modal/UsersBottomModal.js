import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import UserCard from '../ReusableComponents/UserCard';
import { Theme } from '../../theme/Colours';
import EmptyConnections from '../../assets/svg/empty-connections.svg';
import ImgBanner from '../ReusableComponents/ImgBanner';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_USER_FRIENDS } from '../../graphql';
import { showMessage } from 'react-native-flash-message';

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
  ({ name, userId, type, onPress }, ref) => {
    // use Lazy Query so that it is not executed unless opened
    const [
      getUsers,
      { data: userData, loading, error, called },
    ] = useLazyQuery(GET_USER_FRIENDS, { variables: { userId: userId } });

    if (error) {
    showMessage({
      message: "Server Error",
      description: error.message,
      type: "warning",
      autoHide: false,
      icon: 'auto'
    });
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
    }

    const listEmptyComponent = () => (
      <ImgBanner
        Img={EmptyConnections}
        placeholder="No users found"
        spacing={0.16}
      />
    );

    const renderItem = ({ item }) => {
      const { id, image, name } = item;
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

    return (
      <Modalize
        ref={ref}
        modalStyle={styles.container}
        flatListProps={{
          showsVerticalScrollIndicator: false,
          data: userData ? userData.friends : null,
          ListEmptyComponent: listEmptyComponent,
          style: listContainer,
          renderItem: renderItem,
          ListHeaderComponent: header,
          bounces: false,
        }}
        onOpen={called ? null : getUsers}
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
  listContainer: {
    flex: 1,
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
