import React, { useContext } from 'react';
import { Button, Platform, View } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import {
  NOTIFICATION_FRAG,
  NOTIFICATION_SUBSCRIPTION_FRAG,
  SEE_ALL_NOTIFICATIONS,
} from '../../graphql';
import { AuthContext } from '../../context';

const SeeAllNotifications = () => {
  const { authState } = useContext(AuthContext);

  const [seeAll] = useMutation(SEE_ALL_NOTIFICATIONS, {
    variables: { id: authState.user.uid },
    update: (cache) => {
      try {
        const { notifications } = cache.readFragment({
          id: `user:${authState.user.uid}`,
          fragment: NOTIFICATION_SUBSCRIPTION_FRAG,
        });

        notifications.forEach((n) => (n.seen = true));

        cache.writeFragment({
          id: `user:${authState.user.uid}`,
          fragment: NOTIFICATION_SUBSCRIPTION_FRAG,
          data: { __typename: 'user', notifications: notifications },
        });

        cache.writeFragment({
          id: `user:${authState.user.uid}`,
          fragment: NOTIFICATION_FRAG,
          data: { __typename: 'user', notifications: [] },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <View style={Platform.OS === 'android' ? { marginRight: 5 } : null}>
      <Button title={'Set All Seen'} onPress={seeAll} />
    </View>
  );
};

export default SeeAllNotifications;
