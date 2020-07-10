import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Theme, ThemeStatic } from '../../theme/Colours';
import FormInput from '../ReusableComponents/FormInput';
import Selection from '../ReusableComponents/Selection';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { GET_DETAILED_GROUP, UPDATE_GROUP } from '../../graphql';

const HEIGHT = Dimensions.get('window').height;
const { colours } = Theme.light;

/**
 * Modal for creating an event accessable only by Leaders through the Group page
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly groupId?: *, readonly groupName?: *, readonly onClose?: *}> & React.RefAttributes<unknown>>}
 */
const NewEventModal = React.forwardRef(({groupId, onClose, groupName}, ref) => {

  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [isUploading, setIsUploading] = useState(false);


  const onDone = () => {
    setIsUploading(true)

  };



  return (
    <Modalize
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        bounces: false,
      }}
      modalTopOffset={110}
      onClose={onClose}
      rootStyle={[StyleSheet.absoluteFill, { minHeight: HEIGHT * 0.4 }]}>
      <View style={{ paddingHorizontal: 20 }}>
        <ModalHeader
          heading="Create event"
          subHeading={`Create an Event for ${groupName}`}
        />
        <View style={styles.content}>
          <ImageBackground
            source={{
              uri: image,
            }}
            style={styles.image}
            imageStyle={styles.avatarImage}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                console.log('change image');
              }}
              style={styles.imageOverlay}>
              <Icon name="pencil" size={26} color={ThemeStatic.white} />
            </TouchableOpacity>
          </ImageBackground>

          <FormInput
            ref={null}
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder={"example: Beach Day"}
          />
          <FormInput
            ref={null}
            label="Description"
            placeholder="example: This event is brought to you by our sponsors"
            value={description}
            onChangeText={setDescription}
            multiline
            characterRestriction={200}
          />

          <FormInput
            ref={null}
            label="Location"
            placeholder="example: 321 Bloor St."
            value={location}
            onChangeText={setLocation}
            characterRestriction={50}
          />


          <ButtonColour
            label="Done"
            title="done"
            onPress={onDone}
            loading={isUploading}
            containerStyle={styles.doneButton}
            colour={ThemeStatic.accent}
            light={true}
          />
        </View>
      </View>
    </Modalize>
  )

});

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    height: 100,
    width: 150,
    borderRadius: 5,
    marginTop: 20,
  },
  avatarImage: {
    backgroundColor: colours.placeholder,
  },
  imageOverlay: {
    position: 'absolute',
    height: 100,
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colours.accent,
    opacity: 0.5,
  },
  doneButton: {
    marginVertical: 20,
  },
});

export default NewEventModal;
