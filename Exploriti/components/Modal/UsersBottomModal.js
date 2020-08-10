import React, { useContext } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import UserCard from '../ReusableComponents/UserCard';
import { Theme } from '../../theme/Colours';
import EmptyConnections from '../../assets/svg/empty-connections.svg';
import ImgBanner from '../ReusableComponents/ImgBanner';
import { useLazyQuery } from '@apollo/react-hooks';
import { processWarning } from '../../context';
import { useSafeArea } from 'react-native-safe-area-context';

const { colours } = Theme.light;
const window = Dimensions.get('window').height;
const window05 = window * 0.05;

/**
 * List modal of users
 * @param name {string} the name of user other than the current user. Do not include if current user
 * @param type {string} The type of data to be expected. One of : friends ,chat, group, event
 * @param data What is shown in the Flatlist. An array of Strings representing userIds
 * @param type {string} Type = Friends when the component is rendering the users that a user is friends with
 * @param onPress {function} an optional onPress() for if you don't want to navigate to profile
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly data?: *, readonly type?: *, readonly viewMode?: *, readonly handle?: *}> & React.RefAttributes<unknown>>}
 */
const UsersBottomModal = React.forwardRef(
  ({ name, type, onPress, query, variables, onClose }, ref) => {
    // use Lazy Query so that it is not executed unless opened
    const [
      getUsers,
      { data: userData, loading, error, called, fetchMore },
    ] = useLazyQuery(query, { variables: { ...variables, offset: 0 } });

    const insets = useSafeArea();

    console.log('userDara', userData)

    if (error) {
      processWarning(error, 'Server Error');
    }

    let heading;
    let subHeading;

    let keyExtractor = (item) => item.id;
    let data = [];

    if (type === 'friends') {
      heading = 'Friends';
      if (name) {
        subHeading = `People ${name} is friends with`;
      } else {
        subHeading = 'People you are friends with';
      }
      keyExtractor = (item) => item.friend.id;
      if (userData) data = userData.user.friends;
    } else if (type === 'chat') {
      heading = 'Chat Participants';
      subHeading = `Members of ${name ? name : 'this chat'}`;
      keyExtractor = (item) => item.id;
      if (userData) data = userData.users;
    } else if (type === 'event') {
      heading = 'Event Attendees';
      subHeading = `Users who ${
        variables.didAccept ? 'will be attending' : 'have been invited'
      } `;
      if (userData) data = userData.event.attendees;
      keyExtractor = (item) => item.user.id;
    }

    const listEmptyComponent = () => (
      <ImgBanner
        Img={EmptyConnections}
        placeholder="No users found"
        spacing={0.16}
      />
    );

    const renderItem = ({ item }) => {
      let user;

      if (type === 'friends') {
        user = item.friend;
      } else if (type === 'event') {
        user = item.user;
      } else {
        user = item;
      }

      const { id, image, name } = user;

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

    const onOpen = () => {
      if (!called) getUsers();
    };

    const onEndReached = () => {
        console.log('onEndReached data', data.length)
        fetchMore({
          variables: {
            ...variables,
            offset: data.length,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            console.log('fetchMore', fetchMoreResult);
            if (!fetchMoreResult) return prev;

            console.log('prev', prev);


            switch (type) {
              case 'chat':
                return { users: [...prev.users, ...fetchMoreResult.users] };
              case 'friends':
                return {
                  user: {
                    ...prev.user,
                    friends: [
                      ...prev.user.friends,
                      ...fetchMoreResult.user.friends,
                    ],
                  },
                };
              case 'event':
                return {
                  event: {
                    ...prev.event,
                    attendees: [
                      ...prev.event.attendees,
                      ...fetchMoreResult.event.attendees
                    ]
                  }
                };
              default:
                return null
            }
          },
        });
      }

    return (
      <Modalize
        ref={ref}
        modalStyle={styles.container}
        flatListProps={{
          showsVerticalScrollIndicator: false,
          data: data,
          ListEmptyComponent: listEmptyComponent,
          keyExtractor: keyExtractor,
          style: { flex: 1, marginBottom: 70 + insets.bottom },
          renderItem: renderItem,
          ListHeaderComponent: header,
          bounces: false,
          onEndReachedThreshold: 0.5,
          initialNumToRender: 18,
          onEndReached: onEndReached
        }}
        onOpen={onOpen}
        onClose={onClose}
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
