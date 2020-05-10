
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
  query getUser($id: uuid!) {
    user (id: $id) {
        name
        description
        programs {
            program {
                id
                name
            }
        }
    }
  }
`;

const {colours} = Theme.light;

export default function Profile() {
    const userId = "43fa570f-0125-416e-8ec4-84b43c20da16";
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id: userId },
    });
  
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Error e={error} />;

    const about = data.user.description;
    const name = data.user.name;
    const handle = data.user.programs.map(i => i.program.name).join(', ');
   
    return (
        <ProfileCard editable={true} about={about} name={name} handle={handle} avatar={"https://reactjs.org/logo-og.png"}></ProfileCard>
    );
}

const EditProfile = ({ onEdit }) => {
  return (
      <TouchableOpacity activeOpacity={1} onPress={onEdit} style={styles().editProfile}>
        <Icon name='pencil' size={16} color={ThemeStatic.white} />
      </TouchableOpacity>
  );
};

const Connections = ({ total, type, onPress }) => {
  return (
      <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={styles().connections}>
        <Text style={styles().connectionsText}>{total}</Text>
        <Text style={styles().connectionsType}>{type}</Text>
      </TouchableOpacity>
  );
};

const ProfileCard = ({ avatar, editable, onEdit, onFollowingOpen, onFollowersOpen, name, handle, renderInteractions, about }) => {
  return (
      <View style={styles().container}>
        <View style={styles().info}>
          <Connections onPress={onFollowingOpen} total={0} type='FRIENDS' />
          <ImageBackground
              source={{ uri: avatar ? avatar : '' }}
              style={styles().avatar}
              imageStyle={styles().avatarImage}>
            {editable && <EditProfile onEdit={onEdit} />}
          </ImageBackground>
          <Connections onPress={onFollowersOpen} total={0} type='GROUPS' />
        </View>
        <View style={styles().name}>
          <Text style={styles().usernameText}>{name}</Text>
          <Text style={styles().handleText}>{handle}</Text>
        </View>
        {renderInteractions && renderInteractions()}
        <View style={styles().about}>
          <Text style={styles().aboutTitle}>About</Text>
          <Text style={styles().aboutText}>{about}</Text>
        </View>
      </View>
  );
};

const styles = () => StyleSheet.create({
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
    backgroundColor: colours.accent
  },
  connections: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionsText: {
    ...FontWeights.Regular,
    ...FontSizes.SubHeading,
    color: colours.text01
  },
  connectionsType: {
    ...FontWeights.Bold,
    ...FontSizes.Caption,
    color: colours.text02,
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
    color: colours.text01
  },
  handleText: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: colours.text02,
    marginTop: 5
  },
  about: {
    padding: 16,
    marginTop: 16,
    backgroundColor: colours.accent,
    borderRadius: 10,
    marginBottom: 10
  },
  aboutTitle: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: colours.white,
  },
  aboutText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: colours.white,
    marginTop: 5,
  }
});

