import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import { Theme, ThemeStatic } from '../../theme/Colours';
import FormInput from '../ReusableComponents/FormInput';
import Fonts from '../../theme/Fonts';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { GET_ALL_USERS, SEND_NOTIFICATIONS } from '../../graphql';
import { NotificationTypes, processError } from '../../context';

const { FontWeights, FontSizes } = Fonts;

const SendAnnouncementModal = React.forwardRef(({onClose}, ref) => {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const [getAllUsers, {error, loading, data}] = useLazyQuery(GET_ALL_USERS);
  const [sendNotifications, {error: notifError}] = useMutation(SEND_NOTIFICATIONS);

  if (error) processError(error, 'Cannot send message')
  if (notifError) processError(notifError, 'Cannot send message')

  const onSend = async () => {
    setIsUploading(true);

    console.log('allUsers', data);

    const userIds = [];
    data.users.forEach(u => userIds.push({ userId: u.id }))

    sendNotifications({
      variables: {
        type: NotificationTypes.system,
        typeId: message,
        recipients: userIds,
      },
    }).catch((e) => console.log(e));

    setIsUploading(false);
    setMessage('');
    ref.current.close();

  }


  return (
    <Modalize
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        bounces: false,
      }}
      modalTopOffset={110}
      onOpen={getAllUsers}
      onClose={onClose}>
      <View style={styles.container}>
        <ModalHeader
          heading="Send an Announcement"
          subHeading="Your announcement will be sent as a push notification to user's phones"
        />
        <Text style={styles.info}>Please use for important Information only. Users will already receive notifications for new events and updates to event times.</Text>
        <FormInput
          value={message}
          onChangeText={setMessage}
          label={'Message'}
          characterRestriction={100}
          placeholder={'example: The winner of the orientation competition is group A!'}
          ref={null}
        />
        <ButtonColour
          label={'Send'}
          colour={ThemeStatic.accent}
          onPress={onSend}
          loading={loading || isUploading}
          loadColour={'white'}
          light={true}
          containerStyle={{ marginVertical: 30 }}
        />
      </View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20
  },
  info: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    marginVertical: 12
  }

});

export default SendAnnouncementModal;
