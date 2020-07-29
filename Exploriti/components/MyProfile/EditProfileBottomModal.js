import React, { useContext, useRef, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Theme, ThemeStatic } from '../../theme/Colours';
import ModalHeader from '../Modal/ModalHeader';
import Icon from 'react-native-vector-icons/EvilIcons';

import FormInput from '../ReusableComponents/FormInput';
import ButtonColour from '../ReusableComponents/ButtonColour';
import Selection from '../ReusableComponents/Selection';
import RadioButtonFlatList from '../Modal/RadioButtonFlatList';
import { AuthContext, saveImage, yearsData, yearToInt } from '../../context';
import SearchableFlatList from '../Modal/SearchableFlatList';
import {
  GET_INTERESTS,
  GET_PROGRAMS,
  GET_USER_INTERESTS,
  UPDATE_USER,
  UPDATE_USER_INTERESTS,
  UPDATE_USER_PROGRAMS,
} from '../../graphql';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import ImagePicker from 'react-native-image-crop-picker';
import { useHeaderHeight } from '@react-navigation/stack';
import { useSafeArea } from 'react-native-safe-area-context';

/**
 * Modal for editing the logged in users data
 * @param image
 * @param name
 * @param programs
 * @param description
 * @param year
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly description?: *, readonly imageonly name?: *, readonly program?: *}> & React.RefAttributes<unknown>>}
 */
const EditProfileBottomModal = React.forwardRef(
  ({ image, name, programs, description, year }, ref) => {
    const { authState } = useContext(AuthContext);
    const [updateUser] = useMutation(UPDATE_USER);
    const [updateInterests] = useMutation(UPDATE_USER_INTERESTS);
    const [updatePrograms] = useMutation(UPDATE_USER_PROGRAMS);
    const headerHeight = useHeaderHeight();
    // only call query when modal has been opened
    const [getInterests, { called, loading, data, error }] = useLazyQuery(
      GET_USER_INTERESTS,
      {
        variables: { id: authState.user.uid },
      },
    );
    const [editableImage, setEditableImage] = useState(image);
    const [imageSelection, setImageSelection] = useState();
    const [editableName, setEditableName] = useState(name);
    const [editableYear, setEditableYear] = useState(year);
    const [editablePrograms, setEditablePrograms] = useState();
    const [programsSelection, setProgramsSelection] = useState();
    const [editableInterests, setEditableInterests] = useState([]); // A string array of interest titles
    const [interestsSelection, setInterestsSelection] = useState(); // A string array of numbers which are interest IDs
    const [editableDescription, setEditableDescription] = useState(description);
    const [isUploading, setIsUploading] = useState(false);
    const insets = useSafeArea()

    const yearRef = useRef();
    const programRef = useRef();
    const interestRef = useRef();

    const onYearRef = () => yearRef.current.open();
    const onProgramRef = () => programRef.current.open();
    const onInterestRef = () => interestRef.current.open();

    const programTitle = () => {
      if (programsSelection) {
        if (editablePrograms[0] == undefined) editablePrograms.shift();
        return editablePrograms.join(', ');
      }
      return 'Change program';
    };

    const interestTitle = () => {
      if (!called || loading || error || !interestsSelection) {
        return 'Change Interests';
      }
      if (editableInterests[0] == undefined) editableInterests.shift();
      return editableInterests.join(', ');
    };

    const yearTitle = () => {
      if (editableYear === year) {
        return 'Change year';
      }
      return editableYear;
    };

    const initialInterestSelection = () => {
      const map = new Map();
      if (data && !error && data.user && data.user.interests)
        data.user.interests.map((item) =>
          map.set(item.interest, true),
        );
      return map;
    };

    const initialProgramSelection = () => {
      const map = new Map();
      programs.map((userProgram) =>
        map.set(userProgram.program.id.toString(), true),
      );
      return map;
    };

    const changeImage = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true
      })
        .then((selectedImage) => {
          setEditableImage(selectedImage.path);
          setImageSelection(selectedImage);
        })
        .catch((result) => console.log(result));
    };

    const onDone = async () => {
      setIsUploading(true);
      const fields = {};
      if (editableName !== name) fields.name = editableName;
      if (editableDescription !== description)
        fields.description = editableDescription;
      if (editableYear !== year) {
        fields.year = yearToInt(editableYear);
      }
      if (programsSelection) {
        const objects = [];
        programsSelection.map((program) =>
          objects.push({
            userId: authState.user.uid,
            programId: parseInt(program),
          }),
        );
        await updatePrograms({
          variables: { userId: authState.user.uid, objects: objects },
        }).catch((e) => console.log(e));
      }
      if (interestsSelection) {
        const objects = [];
        interestsSelection.map((interest) =>
          objects.push({
            userId: authState.user.uid,
            interestId: parseInt(interest),
          }),
        );
        await updateInterests({
          variables: { userId: authState.user.uid, objects: objects },
        }).catch((e) => console.log(e));
      }

      if (imageSelection) {
        fields.image = await saveImage(imageSelection, image, 'profile', authState.user.uid);
      }

      if (Object.keys(fields).length !== 0) {
        updateUser({
          variables: { data: fields, user: { id: authState.user.uid } },
        })
          .then(() => {
            setIsUploading(false);
            ref.current.close();
          })
          .catch((e) => console.log(e));
      } else {
        setIsUploading(false);
        ref.current.close();
      }
    };

    return (
      <>
        <Modalize
          ref={ref}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          modalStyle={styles.container}
          modalTopOffset={headerHeight + 100}
          adjustToContentHeight
          tapGestureEnabled={false}
          onOpen={getInterests}>
          <View style={{ paddingHorizontal: 20 }}>
            <ModalHeader
              heading="Edit profile"
              subHeading="Edit your personal information"
            />
            <View style={styles.content}>
              <ImageBackground
                source={{
                  uri: editableImage,
                }}
                style={styles.image}
                imageStyle={styles.avatarImage}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={changeImage}
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
                placeholder="example: hey, I am a student"
                value={editableDescription}
                onChangeText={setEditableDescription}
                multiline
                characterRestriction={200}
              />
              <View style={{ height: 4 }} />
              <Selection
                title={programTitle()}
                onPress={onProgramRef}
                accent={true}
                style={styles.selections}
              />
              <View style={{ height: 8 }} />
              <Selection
                title={yearTitle()}
                onPress={onYearRef}
                accent={true}
                style={styles.selections}
              />
              <View style={{ height: 8 }} />
              <Selection
                title={interestTitle()}
                onPress={onInterestRef}
                accent={true}
                style={styles.selections}
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
          <RadioButtonFlatList
            ref={yearRef}
            title={'year'}
            data={yearsData}
            selectedData={editableYear}
            setData={setEditableYear}
          />
        </Modalize>
        {
          // only render the SearchableFlatList once the modal has been opened and data has been received so that initialSelection does not have to change.

          data ? (
            <>
              <SearchableFlatList
                ref={programRef}
                title={'programs'}
                query={called ? GET_PROGRAMS : undefined}
                setData={setEditablePrograms}
                data={called ? null : ['default']}
                setSelection={setProgramsSelection}
                initialSelection={initialProgramSelection()}
                aliased={false}
                max={4}
                min={1}
                floatingButtonText={'Done'}
                floatingButtonOffset={70 + insets.bottom}
                offset={headerHeight + 70}
              />
              <SearchableFlatList
                ref={interestRef}
                title={'interests'}
                query={called ? GET_INTERESTS : undefined}
                data={called ? null : ['default']}
                setData={setEditableInterests}
                setSelection={setInterestsSelection}
                initialSelection={initialInterestSelection()}
                aliased={false}
                max={5}
                min={1}
                offset={headerHeight + 70}
                floatingButtonText={'Done'}
                floatingButtonOffset={70 + insets.bottom}
              />
            </>
          ) : null
        }
      </>
    );
  },
);

const { colours } = Theme.light;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.base,
  },
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

export default EditProfileBottomModal;
