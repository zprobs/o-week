import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Icon from 'react-native-vector-icons/EvilIcons';
import ModalHeader from './ModalHeader';
import FormInput from '../ReusableComponents/FormInput';
import ImagePicker from 'react-native-image-crop-picker/index';
import {
  AuthContext,
  NotificationTypes,
  processError,
  saveImage,
} from '../../context';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useMutation } from '@apollo/react-hooks';
import {
  ADD_COMMENT,
  GET_POST_COMMENTS,
  SEND_NOTIFICATION,
  SEND_NOTIFICATIONS,
} from '../../graphql';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

const AddCommentModal = React.forwardRef(({ postId, authorId }, ref) => {
  const [isUploading, setIsUploading] = useState(false);
  const { authState } = useContext(AuthContext);

  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    refetchQueries: [
      { query: GET_POST_COMMENTS, variables: { postId: postId, offset: 0 } },
    ],
  });
  const [sendNotification] = useMutation(SEND_NOTIFICATION);

  if (error) {
    processError(error, 'Could not add comment');
  }

  const onDone = async (values) => {
    setIsUploading(true);
    console.log('values', values);
    addComment({
      variables: {
        text: values.text,
        postId: postId,
        authorId: authState.user.uid,
      },
    }).catch(() => {
      setIsUploading(false);
    }).then(()=>{
      sendNotification({
        variables: {
          type: NotificationTypes.newComment,
          typeId: postId.toString(),
          recipient: authorId,
        },
      });
      setIsUploading(false);
      ref.current.close();
    })
  };

  return (
    <Modalize
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles.container}
      adjustToContentHeight>
      <ModalHeader heading="Add Comment" subHeading="Share your thoughts" />
      <View style={styles.content}>
        <Formik
          initialValues={{ text: '' }}
          validationSchema={AddCommentSchema}
          onSubmit={(values) => onDone(values) }>
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
                value={values.text}
                onChangeText={handleChange('text')}
                multiline={true}
                containerStyle={styles.textStyle}
                label={''}
                error={errors.text}
                touched={touched.text}
                onBlur={handleBlur('text')}
                autoCapitalize
              />

              <ButtonColour
                label="Post"
                title="done"
                onPress={handleSubmit}
                loading={isUploading}
                containerStyle={styles.button}
                colour={ThemeStatic.accent}
                light={true}
              />
            </>
          )}
        </Formik>
      </View>
    </Modalize>
  );
});

const AddCommentSchema = Yup.object().shape({
  text: Yup.string().required('Required').max(280),
});

export default AddCommentModal;

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
  textStyle: {
    ...FontWeights.Light,
    color: colours.text01,
    fontSize: FontSizes.Body.fontSize,
    borderWidth: 1,
    borderRadius: 10,
    height: 190,
    padding: 12,
    textAlignVertical: 'top',
  },
});

