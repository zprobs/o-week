import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_USER_LINKS, UPDATE_USER } from '../../graphql';
import { AuthContext } from '../../context';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;
/**
 * NewSocialMediaLinkBottomModal used to create a social media link. If link already exists, may delete it.
 * @param type {int} The type of website. 1 : FB, 2: Insta, 3: LinkedIn, 4: Snap, 5: Twitter, 6: Youtube
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly type?: *}> & React.RefAttributes<unknown>>}
 */
const NewSocialMediaLinkBottomModal = React.forwardRef(({ type }, ref) => {
  console.log('type', type, typeof type);
  const [value, setValue] = useState('');
  const { authState } = useContext(AuthContext);
  const { data } = useQuery(GET_USER_LINKS, {
    variables: { user: authState.user.uid },
  });
  let prevLinks = data ? data.user.links : {};
  const [updateLinks] = useMutation(UPDATE_USER);
  const [isUploading, setIsUploading] = useState(false);

  console.log('prevLinks', prevLinks, data);

  const onOpen = () => {
    if (prevLinks[type.toString()]) {
      setValue(prevLinks[type.toString()]);
    }
  };

  const title = () => {
    switch (type) {
      case 1:
        return 'Facebook Page';
      case 2:
        return 'Instagram Page';
      case 3:
        return 'LinkedIn Profile';
      case 4:
        return 'Snapchat User Name';
      case 5:
        return 'Twitter Page';
      case 6:
        return 'Tik Tok account';
      default:
        return 'Social Media';
    }
  };

  const address = () => {
    switch (type) {
      case 1:
        return 'www.facebook.com/';
      case 2:
        return 'www.instagram.com/';
      case 3:
        return 'www.linkedin.com/in/';
      case 4:
        return 'Snapchat User Name: ';
      case 5:
        return 'www.twitter.com/';
      case 6:
        return 'www.tiktok.com/@';
      default:
        return '';
    }
  };

  const DeleteButton = () => {
    if (prevLinks[type] != null && !isUploading) {
      return (
        <ButtonColour
          labelStyle={{ color: ThemeStatic.delete }}
          colour={colours.placeholder}
          containerStyle={styles.button}
          label={'Remove Link'}
          onPress={onRemove}
        />
      );
    } else {
      return null;
    }
  };

  const header = () => (
    <ModalHeader
      heading={'Add your ' + title()}
      subHeading={'Copy the exact address from the URL bar to create a link'}
    />
  );

  const onSubmit = () => {
    setIsUploading(true);

    prevLinks[type.toString()] = value;
    const data = {};
    data.links = prevLinks;
    updateLinks({
      variables: {
        user: { id: authState.user.uid },
        data: data,
      },
      refetchQueries: ['getUserLinks'],
      awaitRefetchQueries: true,
    })
      .then(() => {
        setValue('');
        setIsUploading(false);
        ref.current.close();
      })
      .catch((e) => console.log(e));
  };

  const onRemove = () => {
    delete prevLinks[type.toString()];
    const data = {};
    data.links = prevLinks;
    updateLinks({
      variables: {
        user: { id: authState.user.uid },
        data: data,
      },
      refetchQueries: ['getUserLinks'],
      awaitRefetchQueries: true,
    })
      .then(() => {
        setValue('');
        ref.current.close();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Modalize
      ref={ref}
      modalStyle={styles.container}
      HeaderComponent={header}
      adjustToContentHeight={false}
      onClose={() => setValue('')}
      panGestureComponentEnabled={true}
      onOpen={onOpen}>
      <View style={styles.inputBox}>
        <Text style={styles.url}>
          {(type !== 4 ? 'https://' : '') + address()}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={'john.doe.18'}
          value={value}
          onChangeText={(text) => setValue(text)}
          autoFocus={true}
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
        />
      </View>
      <ButtonColour
        label={'Submit'}
        colour={colours.accent}
        containerStyle={styles.button}
        light={true}
        onPress={onSubmit}
        loading={isUploading}
      />
      <DeleteButton />
    </Modalize>
  );
});

export default NewSocialMediaLinkBottomModal;

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').height * 0.12,
    paddingHorizontal: 16,
    paddingTop: 0,
    backgroundColor: colours.base,
  },
  inputBox: {
    backgroundColor: colours.text02,
    flexDirection: 'row',
    borderRadius: 8,
    marginVertical: 20,
  },
  url: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: colours.placeholder,
    marginVertical: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: colours.white,
    flex: 1,
    borderBottomEndRadius: 8,
    borderTopEndRadius: 8,
    borderWidth: 1,
    marginLeft: 3,
    padding: 5,
  },
  button: {
    marginVertical: 20,
  },
});
