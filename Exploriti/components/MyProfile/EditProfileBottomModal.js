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
import {
  AuthContext,
  processError,
  saveImage,
  yearsData,
  yearToInt,
} from '../../context';
import SearchableFlatList from '../Modal/SearchableFlatList';
import {
  GET_INTERESTS,
  GET_PROGRAMS,
  UPDATE_USER,
  UPDATE_USER_INTERESTS,
  UPDATE_USER_PROGRAMS,
} from '../../graphql';
import { useMutation } from '@apollo/react-hooks';
import ImagePicker from 'react-native-image-crop-picker';
import { useHeaderHeight } from '@react-navigation/stack';
import { useSafeArea } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
    const [updateUser, { error: updateError }] = useMutation(UPDATE_USER);
    const [updateInterests, { interestError }] = useMutation(
      UPDATE_USER_INTERESTS,
    );
    const [updatePrograms, { programError }] = useMutation(
      UPDATE_USER_PROGRAMS,
    );
    const headerHeight = useHeaderHeight();
    const [editableImage, setEditableImage] = useState(image);
    const [imageSelection, setImageSelection] = useState();
    const [editableYear, setEditableYear] = useState(year);
    const [editablePrograms, setEditablePrograms] = useState([]);
    const [programsSelection, setProgramsSelection] = useState();
    const [editableInterests, setEditableInterests] = useState([]); // A string array of interest titles
    const [interestsSelection, setInterestsSelection] = useState(); // A string array of numbers which are interest IDs
    const [isUploading, setIsUploading] = useState(false);
    const [wasOpened, setWasOpened] = useState(false);
    const insets = useSafeArea();
    const yearRef = useRef();
    const programRef = useRef();
    const interestRef = useRef();

    const onYearRef = () => yearRef.current.open();
    const onProgramRef = () => programRef.current.open();
    const onInterestRef = () => interestRef.current.open();

    if (updateError) {
      processError(updateError, 'Cannot Update Profile');
    }

    if (interestError) {
      processError(interestError, 'Cannot Update Profile');
    }

    if (programError) {
      processError(programError, 'Cannot Update Profile');
    }

    const programTitle = () => {
      if (programsSelection && programsSelection.length > 0) {
        if (editablePrograms[0] == undefined) editablePrograms.shift();
        return editablePrograms.join(', ');
      }
      return 'Change program';
    };

    const interestTitle = () => {
      if (interestsSelection && interestsSelection.length > 0) {
        if (editableInterests[0] == undefined) editableInterests.shift();
        return editableInterests.join(', ');
      }
      return 'Change Interest';
    };

    const yearTitle = () => {
      if (editableYear === year) {
        return 'Change year';
      }
      return editableYear;
    };

    const changeImage = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
      })
        .then((selectedImage) => {
          setEditableImage(selectedImage.path);
          setImageSelection(selectedImage);
        })
        .catch((result) => console.log(result));
    };

    const onDone = async (values) => {
      console.log('name, desc', values.name, values.description);
      setIsUploading(true);
      const fields = {};
      if (values.name !== name) fields.name = values.name;
      if (values.description !== description)
        fields.description = values.description;
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
        fields.image = await saveImage(
          imageSelection,
          image,
          'profile',
          authState.user.uid,
        );
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
          onOpen={() => setWasOpened(true)}>
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

              <Formik
                initialValues={{ name: name, description: description }}
                validationSchema={EditProfileSchema}
                onSubmit={(values) => onDone(values)}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <FormInput
                      ref={null}
                      value={values.name}
                      onChangeText={handleChange('name')}
                      label={'Name'}
                      error={errors.name}
                      touched={touched.name}
                      onBlur={handleBlur('name')}
                    />
                    <FormInput
                      ref={null}
                      label="Description"
                      placeholder="example: hey, I am a student"
                      value={values.description}
                      onChangeText={handleChange('description')}
                      multiline
                      error={errors.description}
                      touched={touched.description}
                      onBlur={handleBlur('description')}
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
                      onPress={handleSubmit}
                      loading={isUploading}
                      containerStyle={styles.doneButton}
                      colour={ThemeStatic.accent}
                      light={true}
                    />
                  </>
                )}
              </Formik>
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
        {wasOpened ? (
          <>
            <SearchableFlatList
              ref={programRef}
              title={'programs'}
              query={wasOpened ? GET_PROGRAMS : undefined}
              setData={setEditablePrograms}
              data={wasOpened ? null : ['default']}
              setSelection={setProgramsSelection}
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
              query={wasOpened ? GET_INTERESTS : undefined}
              data={wasOpened ? null : ['default']}
              setData={setEditableInterests}
              setSelection={setInterestsSelection}
              aliased={false}
              max={5}
              min={1}
              offset={headerHeight + 70}
              floatingButtonText={'Done'}
              floatingButtonOffset={70 + insets.bottom}
            />
          </>
        ) : null}
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

const EditProfileSchema = Yup.object().shape({
  name: Yup.string().required('Required').max(60),
  description: Yup.string().max(400),
});

export default EditProfileBottomModal;
