import React, { useContext, useState } from 'react';
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
import { DETAILED_CHAT, UNSUBSCRIBE_FROM_CHAT, UPDATE_CHAT } from '../../graphql';
import { Formik } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { showMessage } from 'react-native-flash-message';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * @param prevImage {string} existing image
 * @param prevName {string} existing name
 * @param id {int}
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly image?: *, readonly id?: *, readonly name?: *}> & React.RefAttributes<unknown>>}
 */
const ChatOptionsModal = React.forwardRef(
  ({ prevImage, prevName, id, setName }, ref) => {
    const [image, setImage] = useState(prevImage);
    const [imageSelection, setImageSelection] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const { authState } = useContext(AuthContext);

    const [updateChat, { error }] = useMutation(UPDATE_CHAT);

    if (error) {
      processError(error, 'Could not update Chat');
    }

    const changeImage = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
      })
        .then((selectedImage) => {
          setImage(selectedImage.path);
          setImageSelection(selectedImage);
        })
        .catch((result) => console.log(result));
    };

    const report = () => {
      showMessage({
        message: 'Report Submitted',
        description: 'This chat has been submitted for review. You may leave the chat by swiping left in the Messages List screen',
        autoHide: true,
        duration: 4500,
        type: 'success',
        icon: 'auto'
      });
    }

    const onDone = async (values) => {
      setIsUploading(true);
      const fields = {};
      if (imageSelection) {
        fields.image = await saveImage(
          imageSelection,
          prevImage,
          'chat',
          id,
        );
      }
      const { name } = values;
      if (name !== prevName) {
        fields.name = name;
      }

      if (Object.keys(fields).length !== 0) {
        updateChat({
          variables: { id: id, _set: fields },
          update: proxy => {
            setName(name);
          }
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
      <Modalize
        ref={ref}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalStyle={styles.container}
        adjustToContentHeight>
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
                />

                <ButtonColour
                  label="Done"
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
                  onPress={report}
                />

              </>
            )}
          </Formik>
        </View>
      </Modalize>
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
