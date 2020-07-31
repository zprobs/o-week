import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SocialMediaIcons from '../ReusableComponents/SocialMediaIcons';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Theme, ThemeStatic } from '../../theme/Colours';
import Fonts from '../../theme/Fonts';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

/**
 * Profile Card is the UI Component for a user's profile page.
 * @param image Profile picture
 * @param editable Weather or not a user can edit the page. Only true when it is the current user.
 * @param onEdit Opens the EditProfileBottomModal
 * @param onFriendsOpen Opens the UserBottomModal
 * @param onGroupsOpen Opens the GroupBottomModal
 * @param name
 * @param programs
 * @param description
 * @param renderInteractions Will render the ADD FRIEND and MESSAGE buttons if it exists. Should only be included when the profile is not the current user.
 * @param userId
 * @param groupCount Number of groups
 * @param friendCount Number of friends
 * @returns {*}
 * @constructor
 */
const ProfileCard = ({
  image,
  editable,
  onEdit,
  onFriendsOpen,
  onGroupsOpen,
  name,
  programs,
  description,
  renderInteractions,
  userId,
  groupCount,
  friendCount,
}) => {
  const friendType = friendCount === 1 ? 'FRIEND' : 'FRIENDS';
  const groupType = groupCount === 1 ? 'GROUP' : 'GROUPS';

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Connections
          onPress={onFriendsOpen}
          total={friendCount}
          type={friendType}
        />
        <ImageBackground
          source={{ uri: image || '' }}
          style={styles.image}
          imageStyle={styles.avatarImage}>
          {editable && <EditProfile onEdit={onEdit} />}
        </ImageBackground>
        <Connections
          onPress={onGroupsOpen}
          total={groupCount}
          type={groupType}
        />
      </View>
      <View style={styles.name}>
        <Text style={styles.usernameText}>{name}</Text>
        <Text style={styles.programText}>{programs}</Text>
      </View>
      {renderInteractions && renderInteractions()}
      <View style={styles.description}>
        <Text style={styles.descriptionTitle}>About</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <SocialMediaIcons id={userId} />
    </View>
  );
};

const EditProfile = ({ onEdit }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onEdit}
      style={styles.editProfile}>
      <Icon name="pencil" size={25} color={ThemeStatic.white} />
    </TouchableOpacity>
  );
};

const Connections = ({ total, type, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={styles.connections}>
      <Text style={styles.connectionsText}>{total}</Text>
      <Text style={styles.connectionsType}>{type}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 4,
    paddingHorizontal: 15,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    height: 120,
    width: 120,
  },
  avatarImage: {
    backgroundColor: colours.placeholder,
    borderRadius: 120,
  },
  editProfile: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    width: 60,
    height: 32,
    borderWidth: 2,
    borderColor: colours.base,
    backgroundColor: colours.accent,
  },
  connections: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionsText: {
    ...FontWeights.Regular,
    ...FontSizes.SubHeading,
    color: colours.text01,
  },
  connectionsType: {
    ...FontWeights.Bold,
    ...FontSizes.Caption,
    color: colours.text02,
    marginTop: 5,
  },
  name: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  usernameText: {
    ...FontWeights.Bold,
    ...FontSizes.SubHeading,
    color: colours.text01,
  },
  programText: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: colours.text02,
    marginTop: 5,
  },
  description: {
    padding: 16,
    marginTop: 16,
    backgroundColor: colours.accent,
    borderRadius: 10,
    marginBottom: 10,
  },
  descriptionTitle: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: colours.white,
  },
  descriptionText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: colours.white,
    marginTop: 5,
  },

});


export default ProfileCard
