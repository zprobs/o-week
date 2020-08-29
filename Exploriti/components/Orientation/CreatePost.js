import React, { useContext, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import {
  AuthContext,
  NotificationTypes,
  processError,
  saveImage,
} from '../../context';
import FormInput from '../ReusableComponents/FormInput';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  CREATE_POST,
  GET_GROUP_MEMBERS,
  GET_GROUP_POSTS,
  SEND_NOTIFICATIONS,
} from '../../graphql';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker/index';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * User to create a new post. include groupId in route.params
 * @returns {JSX.Element}
 * @constructor
 */
const CreatePost = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageSelection, setImageSelection] = useState([]);

  const { authState } = useContext(AuthContext);
  const { goBack } = useNavigation();
  const route = useRoute();
  const { groupId } = route.params;

  const [createPost, { error }] = useMutation(CREATE_POST);
  const [sendNotifications] = useMutation(SEND_NOTIFICATIONS);
  const { data: groupMembers } = useQuery(GET_GROUP_MEMBERS, {
    variables: { groupId: groupId },
  });

  if (error) processError(error, 'Could not create post');

  const onRemove = (img) => {
    setImages(images.filter((image) => image !== img));
  };

  const onAdd = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      cropperStatusBarColor: '#F6C60F',
      cropperToolbarColor: 'white',
      maxFiles: 16,
    })
      .then((selectedImages) => {
        if (selectedImages.length > 16) selectedImages.length = 16;
        setImages(images.concat(selectedImages.map((img) => img.path)));
        setImageSelection(imageSelection.concat(selectedImages));
        // setImageSelection(selectedImage);
      })
      .catch((result) => console.log(result));
  };

  const onDone = async (values) => {
    setIsUploading(true);
    const { text, link } = values;

    const userIDs = [];
    groupMembers.group.members.map((m) => {
      if (m.userId !== authState.user.uid) userIDs.push({ userId: m.userId });
    });

    if (imageSelection.length > 0) {
      Promise.all(
        // Array of "Promises"
        imageSelection.map((img, index) => {
          return saveImage(
            img,
            null,
            'post',
            `${authState.user.uid}${index}${Date.now().toString()}`,
          );
        }),
      )
        .then((results) => {
          createPost({
            variables: {
              userId: authState.user.uid,
              groupId: groupId,
              text: text,
              link: link,
              images: results,
            },
            refetchQueries: [
              { query: GET_GROUP_POSTS, variables: { groupId: groupId } },
            ],
          })
            .then((createPostData) => {
              sendNotifications({
                variables: {
                  type: NotificationTypes.newPost,
                  typeId: createPostData.data.insert_post_one.id.toString(),
                  recipients: userIDs,
                },
              });
              setIsUploading(false);
              goBack();
            })
            .catch((e) => {
              setIsUploading(false);
              processError(e, 'Could not upload post');
            });
        })
        .catch((e) => {
          processError(e, 'Could not upload image');
          setIsUploading(false);
          return null;
        });
    } else {
      createPost({
        variables: {
          userId: authState.user.uid,
          groupId: groupId,
          text: text,
          link: link,
          images: [],
        },
        refetchQueries: [
          { query: GET_GROUP_POSTS, variables: { groupId: groupId } },
        ],
      })
        .then((createPostData) => {
          sendNotifications({
            variables: {
              type: NotificationTypes.newPost,
              typeId: createPostData.data.insert_post_one.id.toString(),
              recipients: userIDs,
            },
          });
          setIsUploading(false);
          goBack();
        })
        .catch((e) => {
          setIsUploading(false);
          processError(e, 'Could not upload post');
        });
    }
  };

  return (
    <Formik
      initialValues={{ text: '', link: '' }}
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
        <KeyboardAwareScrollView style={styles.container}>
          <View style={{ paddingHorizontal: 20 }}>
            <FormInput
              containerStyle={styles.textStyle}
              label=""
              placeholder={"What's on your mind?"}
              onChangeText={handleChange('text')}
              multiline={true}
              value={values.text}
              error={errors.text}
              touched={touched.text}
              autoCapitalize
            />
          </View>

          <ScrollView
            horizontal={true}
            style={styles.imageScroll}
            bounces={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}>
            {images.length < 16 ? (
              <TouchableOpacity
                style={[styles.image, styles.addImage]}
                onPress={onAdd}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name={'file-plus'} size={20} color={colours.text03} />
                  <Text style={[styles.addPhotosText, { marginLeft: 3 }]}>
                    Add Photos
                  </Text>
                </View>
                <Text
                  style={styles.addPhotosText}>{`${images.length}/16`}</Text>
              </TouchableOpacity>
            ) : null}

            {images.map((img) => (
              <View style={[styles.image, { marginHorizontal: 8 }]} key={img}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => onRemove(img)}>
                  <Icon color={colours.white} size={16} name={'x'} />
                </TouchableOpacity>
                <Image source={{ uri: img }} style={styles.image} />
              </View>
            ))}
          </ScrollView>

          <View style={{ paddingHorizontal: 20 }}>
            <FormInput
              ref={null}
              label="Link (Optional)"
              placeholder="example: https://www.arravon.com/"
              value={values.link}
              onChangeText={handleChange('link')}
              error={errors.link}
              touched={touched.link}
              onBlur={handleBlur('link')}
            />
            <View style={{ height: 4 }} />

            <ButtonColour
              label="Post"
              title="done"
              onPress={handleSubmit}
              loading={isUploading || !groupMembers}
              containerStyle={styles.doneButton}
              colour={ThemeStatic.accent}
              light={true}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

const EditProfileSchema = Yup.object().shape({
  text: Yup.string().required('Required').max(360),
  link: Yup.string().max(2000),
});

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
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
  imageScroll: {
    height: 160,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 16,
  },
  addImage: {
    borderWidth: 0.5,
    borderColor: colours.text03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotosText: {
    ...FontWeights.Regular,
    ...FontSizes.Caption,
  },
  removeButton: {
    height: 26,
    width: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.60)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 4,
  },
});
