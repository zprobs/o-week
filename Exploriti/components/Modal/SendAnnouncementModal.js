import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import { Theme, ThemeStatic } from '../../theme/Colours';
import FormInput from '../ReusableComponents/FormInput';
import Fonts from '../../theme/Fonts';
import ButtonColour from '../ReusableComponents/ButtonColour';

const { FontWeights, FontSizes } = Fonts;

const SendAnnouncementModal = React.forwardRef(({onClose}, ref) => {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState();

  const onSend = () => {
    setIsUploading(true);
    setIsUploading(false);

  }


  return (
    <Modalize
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        bounces: false,
      }}
      modalTopOffset={110}
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
          loading={isUploading}
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
