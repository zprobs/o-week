import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Error from "../Error";
import Fonts from '../../theme/Fonts';
import {Theme} from '../../theme/Colours';
import {ThemeStatic} from '../../theme/Colours';
import Icon from "react-native-vector-icons/EvilIcons";

const { FontWeights, FontSizes } = Fonts;

const GET_USER = gql`
  {
    users {
      id
      name
    }
  }
`;

export default function Profile() {
  // const { loading, error, data } = useQuery(GET_USER);
  //
  // if (loading) return <Text>Loading...</Text>;
  // if (error) return <Error e={error} />;

  // ToDo: Load user info form {data} into Profile Card once API ready

  const about = "This is a description about the user";
  const name = "Zachary Probst";
  const handle = "Comp. Sci and Economics"


  return (
   <ProfileCard editable={true} about={about} name={name} handle={handle} avatar={""}></ProfileCard>
  );
}

const EditProfile = ({ onEdit }) => {
  return (
      <TouchableOpacity activeOpacity={1} onPress={onEdit} style={styles(Theme).editProfile}>
        <Icon name='pencil' size={16} color={ThemeStatic.white} />
      </TouchableOpacity>
  );
};

const Connections = ({ total, type, onPress }) => {
  return (
      <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={styles(Theme).connections}>
        <Text style={styles(Theme).connectionsText}>{total}</Text>
        <Text style={styles(Theme).connectionsType}>{type}</Text>
      </TouchableOpacity>
  );
};

const ProfileCard = ({ avatar, editable, onEdit, onFollowingOpen, onFollowersOpen, name, handle, renderInteractions, about }) => {
  return (
      <View style={styles(Theme).container}>
        <View style={styles(Theme).info}>
          <Connections onPress={onFollowingOpen} total={0} type='FRIENDS' />
          <ImageBackground
              source={{ uri: avatar ? avatar : '' }}
              style={styles(Theme).avatar}
              imageStyle={styles(Theme).avatarImage}>
            {editable && <EditProfile onEdit={onEdit} />}
          </ImageBackground>
          <Connections onPress={onFollowersOpen} total={0} type='GROUPS' />
        </View>
        <View style={styles(Theme).name}>
          <Text style={styles(Theme).usernameText}>{name}</Text>
          <Text style={styles(Theme).handleText}>{handle}</Text>
        </View>
        {renderInteractions && renderInteractions()}
        <View style={styles(Theme).about}>
          <Text style={styles(Theme).aboutTitle}>About</Text>
          <Text style={styles(Theme).aboutText}>{about}</Text>
        </View>
      </View>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 4,
    paddingHorizontal: 10
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    height: 120,
    width: 120
  },
  avatarImage: {
    backgroundColor: theme.placeholder,
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
    borderColor: theme.base,
    backgroundColor: theme.accent
  },
  connections: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionsText: {
    ...FontWeights.Regular,
    ...FontSizes.SubHeading,
    color: theme.text01
  },
  connectionsType: {
    ...FontWeights.Bold,
    ...FontSizes.Caption,
    color: theme.text02,
    marginTop: 5
  },
  name: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  usernameText: {
    ...FontWeights.Bold,
    ...FontSizes.SubHeading,
    color: theme.text01
  },
  handleText: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: theme.text02,
    marginTop: 5
  },
  about: {
    padding: 16,
    marginTop: 16,
    backgroundColor: theme.accent,
    borderRadius: 10,
    marginBottom: 10
  },
  aboutTitle: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: theme.white,
  },
  aboutText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.white,
    marginTop: 5,
  }
});

// unlink proj
