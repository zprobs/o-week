import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { processError } from '@util/messages';
import { NotificationTypes } from '@root/constants';
import FormInput from '@components/form/FormInput';
import ButtonColour from '@components/interactable/ButtonColor';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/client';
import { CreatePost } from '@graphql/Post';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { OrientationStackParamList } from '@views/orientation/OrientationStackParamList';
import { createPost, createPostVariables } from '@graphql/types/createPost';
import { SendNotifications } from '@graphql/Notification';
import {
  sendNotifications,
  sendNotificationsVariables,
} from '@graphql/types/sendNotifications';
import { GetGroupMembers, GetGroupPosts } from '@graphql/Group';
import {
  getGroupMembers,
  getGroupMembersVariables,
} from '@graphql/types/getGroupMembers';
import { saveImage } from '@util/saveImage';
import useStyles from './CreatePost.styles';

interface FormValues {
  text: string;
  link: string;
}

const EditProfileSchema = Yup.object().shape({
  text: Yup.string().required('Required').max(860),
  link: Yup.string().max(2000),
});

/**
 * User to create a new post. include groupId in route.params
 */
const CreatePostPage: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imageSelection, setImageSelection] = useState<ImageOrVideo[]>([]);

  const styles = useStyles();
  const { goBack } = useNavigation();
  const route = useRoute<RouteProp<OrientationStackParamList, 'CreatePost'>>();
  const { groupId } = route.params;

  const [createPostMutation, { error }] = useMutation<
    createPost,
    createPostVariables
  >(CreatePost);
  const [sendNotificationsMutation] = useMutation<
    sendNotifications,
    sendNotificationsVariables
  >(SendNotifications);
  const { data: groupMembers } = useQuery<
    getGroupMembers,
    getGroupMembersVariables
  >(GetGroupMembers, {
    variables: { groupId },
  });

  if (error) processError(error, 'Could not create post');

  const onRemove = (img: string) => {
    setImages(images.filter((image) => image !== img));
    setImageSelection(imageSelection.filter((image) => image.path !== img));
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
        let preparedImages: ImageOrVideo[] = [];
        if (selectedImages.length > 16)
          preparedImages = selectedImages.slice(16);
        setImages(images.concat(preparedImages.map((img) => img.path)));
        setImageSelection(imageSelection.concat(selectedImages));
      })
      .catch((e) => processError(e, 'Could not add images'));
  };

  const onDone = async (values: FormValues) => {
    setIsUploading(true);
    const { text, link } = values;

    const userIDs: Array<{ userId: string }> = [];
    groupMembers?.group?.members.forEach((m) => {
      if (m.userId !== 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3')
        userIDs.push({ userId: m.userId });
    });

    if (imageSelection.length > 0) {
      Promise.all(
        // Array of "Promises"
        imageSelection.map((img, index) => {
          return saveImage(
            img,
            'post',
            `${'MeacvK7z4gWhfkCC6jTNAfEKgXJ3'}${index}${Date.now().toString()}`,
          );
        }),
      )
        .then((results) => {
          createPostMutation({
            variables: {
              userId: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3',
              groupId,
              text,
              link,
              images: results,
            },
            refetchQueries: [{ query: GetGroupPosts, variables: { groupId } }],
          })
            .then((createPostData) => {
              sendNotificationsMutation({
                variables: {
                  type: NotificationTypes.newPost,
                  typeId:
                    createPostData?.data?.insert_post_one?.id?.toString() || '',
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
      createPostMutation({
        variables: {
          userId: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3',
          groupId,
          text,
          link,
          images: [],
        },
        refetchQueries: [{ query: GetGroupPosts, variables: { groupId } }],
      })
        .then((createPostData) => {
          sendNotificationsMutation({
            variables: {
              type: NotificationTypes.newPost,
              typeId:
                createPostData?.data?.insert_post_one?.id?.toString() || '',
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

  const initialValues: FormValues = { text: '', link: '' };

  return (
    <Formik
      initialValues={initialValues}
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
              multiline
              value={values.text}
              error={errors.text}
              touched={touched.text}
              autoCapitalize
              onBlur={handleBlur('text')}
            />
          </View>

          <ScrollView
            horizontal
            style={styles.imageScroll}
            bounces
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}>
            {images.length < 16 ? (
              <TouchableOpacity
                style={[styles.image, styles.addImage]}
                onPress={onAdd}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    name="file-plus"
                    size={20}
                    color={styles.filePlus.color}
                  />
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
                  <Icon color={styles.x.color} size={16} name="x" />
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
              onPress={handleSubmit}
              isLoading={isUploading || !groupMembers}
              color={styles.postButton.color}
              isLight
            />
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default CreatePostPage;
