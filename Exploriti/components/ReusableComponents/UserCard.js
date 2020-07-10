import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme } from '../../theme/Colours';
import { useNavigation } from '@react-navigation/native';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * For rendering a list item. Shows a user in a list, probably a modal.
 * @param userId {string} used when you want to navigate to a profile page
 * @param groupId {string} used when you want to navigate to a group page
 * @param image {string}
 * @param name {string}
 * @param onPress {function} A function which will pass the userId as a parameter
 * @param style Additional style for the entire card
 * @constructor
 */
const UserCard = ({ userId, groupId, image, name, onPress, style }) => {
  const navigation = useNavigation();

  const id = userId ? userId : groupId
  const destination = userId ? 'Profile' : 'GroupScreen';
  const options = userId ? {userId: userId} : {groupId: groupId}

  const navigateToProfile = () => {
    navigation.push(destination, options);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress ? ()=>onPress(id) : navigateToProfile}
      style={[styles.container, style]}>
      <Image source={{ uri: image }} style={styles.avatarImage} />
      <View style={styles.info}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    width: '100%',
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colours.placeholder,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  nameText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: colours.text01,
  },
});

export default UserCard;
