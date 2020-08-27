import React, { useContext, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ImageBackground,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Icon from 'react-native-vector-icons/EvilIcons';
import ModalHeader from './ModalHeader';
import FormInput from '../ReusableComponents/FormInput';
import ImagePicker from 'react-native-image-crop-picker/index';
import { AuthContext, processError, saveImage } from '../../context';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useMutation } from '@apollo/react-hooks';
import {
  ADD_USERS_TO_CHAT,
  MUTE_CHAT,
  REPORT_CHAT,
  SEARCH_USERS_ADD_TO_CHAT,
  SEARCH_USERS_IN_GROUP,
  UPDATE_CHAT,
} from '../../graphql';
import { Formik } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { showMessage } from 'react-native-flash-message';
import SettingsSwitch from '../ReusableComponents/SettingsSwitch';
import SearchableFlatList from './SearchableFlatList';
import Selection from '../ReusableComponents/Selection';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * @param prevImage {string} existing image
 * @param prevName {string} existing name
 * @param chatName {string} if the chat has a custom name then it is this
 * @param id {int}
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly image?: *, readonly id?: *, readonly name?: *}> & React.RefAttributes<unknown>>}
 */
const ChatOptionsModal = React.forwardRef(
  ({ prevImage, prevName, chatName, id, setName, muted }, ref) => {
    const [image, setImage] = useState(prevImage);
    const [imageSelection, setImageSelection] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [isMuted, setIsMuted] = useState(muted);
    const [newMembers, setNewMembers] = useState([]);
    const addUserRef = useRef();
    const { authState } = useContext(AuthContext);
    const [addUser, { error: addUserError }] = useMutation(ADD_USERS_TO_CHAT);
    const [reportChat, { error: reportError }] = useMutation(REPORT_CHAT, {
      variables: { chat: id, reporter: authState.user.uid },
      onCompleted: () => {
        showMessage({
          message: 'Report Submitted',
          description:
            'Thank you for letting us know. We will examine this as soon as possible',
          autoHide: true,
          duration: 4000,
          type: 'success',
          icon: 'auto',
        });
      },
    });

    const [updateChat, { error }] = useMutation(UPDATE_CHAT);
    const [muteChat, { error: muteChatError }] = useMutation(MUTE_CHAT);

    if (error) {
      processError(error, 'Could not update Chat');
    }

    if (reportError) processError(reportError, 'Could not report chat');
    if (muteChatError) processError(muteChatError, 'Could not mute chat');
    if (addUserError) processError(addUserError, 'Could not add users to chat');


    const changeImage = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        cropperStatusBarColor: '#F6C60F',
        cropperToolbarColor: 'white',
      })
        .then((selectedImage) => {
          setImage(selectedImage.path);
          setImageSelection(selectedImage);
        })
        .catch((result) => console.log(result));
    };

    const onDone = async (values) => {
      setIsUploading(true);
      const fields = {};
      if (imageSelection) {
        fields.image = await saveImage(imageSelection, prevImage, 'chat', id);
      }

      if (newMembers.length > 0) {
        const objects = [];
        newMembers.forEach((userId) =>
          objects.push({ chatId: id, userId: userId }),
        );
        const addResult = await addUser({ variables: { objects: objects } });
        console.log('addResult', addResult.data.insert_userChat.returning);
        if (addResult.data && !chatName) {
          setName(
            addResult.data.insert_userChat.returning[0].chat.participants
              .filter((participant) => participant._id !== authState.user.uid)
              .map((participant) => participant.name)
              .join(', '),
          );
        }
      }

      const { name } = values;
      if (name !== prevName) {
        fields.name = name;
      }

      if (isMuted !== muted) {
        muteChat({
          variables: { userId: authState.user.uid, chatId: id, muted: isMuted },
        });
      }

      if (Object.keys(fields).length !== 0) {
        updateChat({
          variables: { id: id, _set: fields },
          update: (proxy) => {
            setName(name);
          },
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
          modalTopOffset={100}>
          <ModalHeader
            heading="Chat Options"
            subHeading="Update Your Group Chat"
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
                onPress={changeImage}
                style={styles.imageOverlay}>
                <Icon name="pencil" size={26} color={ThemeStatic.white} />
              </TouchableOpacity>
            </ImageBackground>

            <Formik
              initialValues={{ name: prevName }}
              validationSchema={ChatNameSchema}
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
                    value={values.name}
                    onChangeText={handleChange('name')}
                    label={'Chat Name'}
                    error={errors.name}
                    touched={touched.name}
                    onBlur={handleBlur('name')}
                    autoCapitalize
                  />

                  <SettingsSwitch
                    title={'Mute Notifications'}
                    isEnabled={isMuted}
                    setIsEnabled={setIsMuted}
                  />
                  <View style={{ height: 8 }} />

                  <Selection
                    title={'Add Members'}
                    onPress={() => addUserRef.current.open()}
                    accent={true}
                  />
                  <View style={{ height: 8 }} />

                  <ButtonColour
                    label="Save"
                    title="done"
                    onPress={handleSubmit}
                    loading={isUploading}
                    containerStyle={styles.button}
                    colour={ThemeStatic.accent}
                    light={true}
                  />

                  <ButtonColour
                    labelStyle={{ color: ThemeStatic.delete }}
                    colour={colours.placeholder}
                    containerStyle={styles.button}
                    label={'Report Chat'}
                    onPress={reportChat}
                  />
                </>
              )}
            </Formik>
          </View>
        </Modalize>
        <SearchableFlatList
          query={SEARCH_USERS_ADD_TO_CHAT}
          variables={{ chatId: id }}
          hasImage={true}
          ref={addUserRef}
          title={'users'}
          offset={180}
          floatingButtonOffset={100}
          setSelection={setNewMembers}
          floatingButtonText={'Add Users'}
          clearOnClose={true}
          max={900}
          min={1}
          serverSearch={true}
        />
      </>
    );
  },
);

const ChatNameSchema = Yup.object().shape({
  name: Yup.string().required('Required').max(80),
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colours.base,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  image: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    marginTop: 20,
    marginBottom: 10,
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
  button: {
    marginTop: 20,
  },
});

export default ChatOptionsModal;
