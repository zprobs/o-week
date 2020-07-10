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

const GroupEditModal = React.forwardRef(({groupId, onClose}, ref) => {

  const [getGroup, {loading, data, error, called}] = useLazyQuery(GET_DETAILED_GROUP, {variables: {id: groupId}})
  const [updateGroup] = useMutation(UPDATE_GROUP)
  const [editableName, setEditableName] = useState();
  const [editableImage, setEditableImage] = useState();
  const [editableDescription, setEditableDescription] = useState();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(()=> {
    if (data) {
      setEditableName(data.group.name);
      setEditableDescription(data.group.description);
      setEditableImage(data.group.image);
    }
  }, [data])

  const onDone = () => {
    setIsUploading(true)
    const fields = {};
    if (editableName !== data.group.name) fields.name = editableName;
    if (editableDescription !== data.group.description) fields.description = editableDescription;
    console.log(fields);
    updateGroup({variables: {id: groupId, data: fields}}).then(
      ()=> {
        setIsUploading(false);
        ref.current.close();
      }
    ).catch(e=>console.log(e.message));
  };


  if (loading) console.log('should not see loading group')

  let content;

  if (called && data) {
    content = (
      <View style={{ paddingHorizontal: 20 }}>
        <ModalHeader
          heading="Edit group"
          subHeading="Edit your group's information"
        />
        <View style={styles.content}>
          <ImageBackground
            source={{
              uri: editableImage ,
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
            value={editableName}
            onChangeText={setEditableName}
          />
          <FormInput
            ref={null}
            label="Description"
            placeholder="example: This group is incredible"
            value={editableDescription}
            onChangeText={setEditableDescription}
            multiline
            characterRestriction={200}
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
    )
  }

  return (
    <Modalize
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        bounces: false,
      }}
      modalTopOffset={110}
      onClose={onClose}
      onOpen={getGroup}
      rootStyle={[StyleSheet.absoluteFill, { minHeight: HEIGHT * 0.4 }]}>
      {content}
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
    width: 100,
    marginTop: 20,
  },
  avatarImage: {
    backgroundColor: colours.placeholder,
    borderRadius: 100,
  },
  imageOverlay: {
    position: 'absolute',
    height: 100,
    width: 100,
    borderRadius: 100,
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

export default GroupEditModal;
