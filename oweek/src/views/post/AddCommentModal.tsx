import React, { useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from '@components/modal/ModalHeader';
import FormInput from '@components/form/FormInput';
import { processError, processWarning } from '@util/messages';
import { NotificationTypes } from '@root/constants';
import ButtonColour from '@components/interactable/ButtonColor';
import { useMutation } from '@apollo/client';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { AddComment, GetPostComments } from '@graphql/Post';
import { addComment, addCommentVariables } from '@graphql/types/addComment';
import { commentsFrag } from '@graphql/types/commentsFrag';
import { CommentsFrag } from '@graphql/Fragments';
import { SendNotification } from '@graphql/Notification';
import {
  sendNotification,
  sendNotificationVariables,
} from '@graphql/types/sendNotification';
import useStyles from './AddCommentModal.styles';

const AddCommentSchema = Yup.object().shape({
  text: Yup.string().required('Required').max(280),
});

interface FormValues {
  text: string;
}

interface Props {
  postId: number;
  authorId: string;
  closeModal: () => void;
}

const AddCommentModal = React.forwardRef<Modalize, Props>(
  ({ postId, authorId, closeModal }, ref) => {
    const styles = useStyles();
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const initialValues: FormValues = { text: '' };

    const [addCommentMutation, { error }] = useMutation<
      addComment,
      addCommentVariables
    >(AddComment, {
      refetchQueries: [
        { query: GetPostComments, variables: { postId, offset: 0 } },
      ],
      update: (cache) => {
        try {
          const commentResult = cache.readFragment<commentsFrag, unknown>({
            id: `post:${postId}`,
            fragment: CommentsFrag,
          });

          const newCount =
            (commentResult?.comments_aggregate?.aggregate?.count || 0) + 1;

          cache.writeFragment({
            id: `post:${postId}`,
            fragment: CommentsFrag,
            data: {
              __typename: 'post',
              comments_aggregate: {
                __typename: 'comment_aggregate',
                aggregate: {
                  __typename: 'comment_aggregate_fields',
                  count: newCount,
                },
              },
            },
          });
        } catch (e) {
          processWarning(e, 'Trouble loading comments');
        }
      },
    });
    const [sendNotificationMutation] = useMutation<
      sendNotification,
      sendNotificationVariables
    >(SendNotification);

    if (error) {
      processError(error, 'Could not add comment');
    }

    const onDone = async (values: FormValues): Promise<void> => {
      setIsUploading(true);
      addCommentMutation({
        variables: {
          text: values.text,
          postId,
          authorId: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3',
        },
      })
        .catch(() => {
          setIsUploading(false);
        })
        .then((result) => {
          if (authorId !== 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3' && result) {
            sendNotificationMutation({
              variables: {
                type: NotificationTypes.newComment,
                typeId: result.data?.insert_comment_one?.id.toString() || '',
                recipient: authorId,
              },
            });
          }
          setIsUploading(false);
          closeModal();
        });
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
            initialValues={initialValues}
            validationSchema={AddCommentSchema}
            onSubmit={(values: FormValues) => onDone(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }: FormikProps<FormValues>) => (
              <>
                <FormInput
                  value={values.text}
                  onChangeText={handleChange('text')}
                  multiline
                  containerStyle={styles.textStyle}
                  label=""
                  error={errors.text}
                  touched={touched.text}
                  onBlur={handleBlur('text')}
                  autoCapitalize
                />

                <ButtonColour
                  label="Post"
                  onPress={handleSubmit}
                  isLoading={isUploading}
                  containerStyle={styles.button}
                  color={styles.buttonColor.color}
                  isLight
                />
              </>
            )}
          </Formik>
        </View>
      </Modalize>
    );
  },
);

export default AddCommentModal;
