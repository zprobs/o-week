import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import { AuthContext, processError } from '../../context';
import FormInput from '../ReusableComponents/FormInput';
import Selection from '../ReusableComponents/Selection';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_POST } from '../../graphql';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;


const CreatePost = () => {

  const [isUploading, setIsUploading] = useState(false);

  const {authState} = useContext(AuthContext)
  const {goBack} = useNavigation();
  const route = useRoute();
  const {groupId} = route.params

  const [createPost, {error}] = useMutation(CREATE_POST);

  if (error) processError(error, 'Could not create post');

  const onDone = async (values) => {
    setIsUploading(true);
    const {text, link, images} = values;
    createPost({variables: {userId: authState.user.uid, groupId: groupId, text: text, link: link, images: images }}).then(()=> {
      setIsUploading(false);
      goBack();
    }).catch(()=>setIsUploading(false))
  }


  return (
    <Formik
      initialValues={{ text: '', images: [], link: '',  }}
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
          <KeyboardAwareScrollView style={styles.scroll}>

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
            loading={isUploading}
            containerStyle={styles.doneButton}
            colour={ThemeStatic.accent}
            light={true}
          />
          </KeyboardAwareScrollView>
      )}
    </Formik>
  )
}

const EditProfileSchema = Yup.object().shape({
  text: Yup.string().required('Required').max(360),
  link: Yup.string().max(2000),
});

export default CreatePost;

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base
  },
  textStyle: {
    ...FontWeights.Light,
    color: colours.text01,
    fontSize: FontSizes.Body.fontSize,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 10,
    height: 190,
    padding: 12,
    textAlignVertical: 'top',
  },
  scroll: {
    paddingHorizontal: 20
  }


})
