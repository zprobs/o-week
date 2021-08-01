import React from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import UserCard from '@components/card/UserCard';
import EmptyConnections from '@root/assets/svg/empty-connections.svg';
import ImgBanner from '@components/list/ImgBanner';
import { DocumentNode, useLazyQuery } from '@apollo/client';
import { processWarning } from '@util/messages';
import { useSafeArea } from 'react-native-safe-area-context';
import ModalHeader from './ModalHeader';
import useStyles from './UsersBottomModal.styles';

interface Props {
  name: string;
  type: string;
  onPress?: () => void;
  query: DocumentNode;
  variables: Record<string, string | boolean | number>;
  onClose: () => void;
}

const UsersBottomModal = React.forwardRef<Modalize, Props>(
  ({ name, type, onPress, query, variables, onClose }, ref) => {
    const styles = useStyles();
    // use Lazy Query so that it is not executed unless opened
    const [getUsers, { data: userData, error, called, fetchMore }] =
      useLazyQuery(query, { variables: { ...variables, offset: 0 } });

    const insets = useSafeArea();

    if (error) {
      processWarning(error, 'Server Error');
    }

    let heading: string;
    let subHeading: string;

    let keyExtractor = (item: any): string => item.id;
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
      subHeading = `Members of ${name || 'this chat'}`;
      keyExtractor = (item) => item.user.id;
      if (userData) data = userData.chat.users;
    } else if (type === 'event') {
      heading = 'Event Attendees';
      subHeading = `Users who ${
        variables.didAccept ? 'will be attending' : 'have been invited'
      } `;
      if (userData) data = userData.event.attendees;
      keyExtractor = (item) => item.user.id;
    } else if (type === 'group') {
      heading = 'Group Members';
      subHeading = `Users who ${
        variables.isOwner ? 'lead this group' : 'are in this group'
      } `;
      if (userData) data = userData.group.members;
    }

    const listEmptyComponent = () => (
      <ImgBanner
        Img={EmptyConnections}
        placeholder="No users found"
        spacing={0.16}
      />
    );

    const renderItem = ({ item }: any) => {
      let user;

      if (type === 'friends') {
        user = item.friend;
      } else if (type === 'event' || type === 'group' || type === 'chat') {
        user = item.user;
      } else {
        user = item;
      }

      const { id, image, Username } = user;

      return (
        <UserCard
          userId={id}
          image={image}
          name={Username}
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
      if (fetchMore) {
        fetchMore({
          variables: {
            ...variables,
            offset: data.length,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;

            switch (type) {
              case 'chat':
                return {
                  chat: {
                    ...prev.chat,
                    users: [...prev.chat.users, ...fetchMoreResult.chat.users],
                  },
                };
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
                      ...fetchMoreResult.event.attendees,
                    ],
                  },
                };
              case 'group':
                return {
                  group: {
                    ...prev.group,
                    members: [
                      ...prev.group.members,
                      ...fetchMoreResult.group.members,
                    ],
                  },
                };
              default:
                return null;
            }
          },
        });
      }
    };

    return (
      <Modalize
        ref={ref}
        modalStyle={[styles.container, StyleSheet.absoluteFill]}
        modalTopOffset={100}
        flatListProps={{
          showsVerticalScrollIndicator: false,
          data,
          ListEmptyComponent: listEmptyComponent,
          keyExtractor,
          style: { flex: 1, marginBottom: 80 + insets.bottom },
          renderItem,
          ListHeaderComponent: header,
          bounces: false,
          onEndReachedThreshold: 0.5,
          initialNumToRender: 18,
          onEndReached,
        }}
        onOpen={onOpen}
        onClose={onClose}
        disableScrollIfPossible
      />
    );
  },
);

export default UsersBottomModal;
