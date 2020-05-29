import React, {useContext, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Error from "../ReusableComponents/Error";
import Fonts from "../../theme/Fonts";
import { Theme } from "../../theme/Colours";
import { ThemeStatic } from "../../theme/Colours";
import Icon from "react-native-vector-icons/EvilIcons";
import { useState } from "react";
import EditProfileBottomModal from "./EditProfileBottomModal";
import UsersBottomModal from "../Modal/UsersBottomModal";
import GroupBottomModal from "../Modal/GroupBottomModal";
import {UserContext} from '../UserContext';

const { FontWeights, FontSizes } = Fonts;

const GET_USER = gql`
  query getUser($id: String!) {
    user(id: $id) {
      name
      description
      programs {
        program {
          id
          name
        }
      }
      image
    }
  }
`;

const { colours } = Theme.light;

export default function Profile() {
    const {authState, setAuthState} = useContext(UserContext);
  const userId = authState.user.uid;
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const editProfileBottomModalRef = useRef();
  const usersBottomModalRef = useRef();
  const groupBottomModalRef = useRef();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Error e={error} />;


  let description = data.user.description;
  const name = data.user.name;
  const program = data.user.programs.map(i => i.program.name).join(", ");
  const image = "https://reactjs.org/logo-og.png";
  //const image = data.user.image;

  const onEdit = () => editProfileBottomModalRef.current.open();
  const onFriendsOpen = () => usersBottomModalRef.current.open();
  const onGroupsOpen = () => groupBottomModalRef.current.open();


  return (
    <>
      <ProfileCard
        editable={true}
        description={description}
        name={name}
        program={program}
        image={image}
        onEdit={onEdit}
        onFriendsOpen={onFriendsOpen}
        onGroupsOpen={onGroupsOpen}
      />
      <EditProfileBottomModal
        ref={editProfileBottomModalRef}
        image={image}
        name={name}
        program={program}
        description={description}
      />
      <UsersBottomModal ref={usersBottomModalRef} data={null} type="Friends" />
      <GroupBottomModal ref={groupBottomModalRef} data={null} type="Member" />
    </>
  );
}

const EditProfile = ({ onEdit }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onEdit}
      style={styles().editProfile}>
      <Icon name="pencil" size={25} color={ThemeStatic.white} />
    </TouchableOpacity>
  );
};

const Connections = ({ total, type, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={styles().connections}>
      <Text style={styles().connectionsText}>{total}</Text>
      <Text style={styles().connectionsType}>{type}</Text>
    </TouchableOpacity>
  );
};

const ProfileCard = ({
  image,
  editable,
  onEdit,
  onFriendsOpen,
  onGroupsOpen,
  name,
  program,
  renderInteractions,
  description,
}) => {
  return (
    <View style={styles().container}>
      <View style={styles().info}>
        <Connections onPress={onFriendsOpen} total={0} type="FRIENDS" />
        <ImageBackground
          source={{ uri: image ? image : "" }}
          style={styles().image}
          imageStyle={styles().avatarImage}>
          {editable && <EditProfile onEdit={onEdit} />}
        </ImageBackground>
        <Connections onPress={onGroupsOpen} total={0} type="GROUPS" />
      </View>
      <View style={styles().name}>
        <Text style={styles().usernameText}>{name}</Text>
        <Text style={styles().programText}>{program}</Text>
      </View>
      {renderInteractions && renderInteractions()}
      <View style={styles().description}>
        <Text style={styles().descriptionTitle}>About</Text>
        <Text style={styles().descriptionText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      paddingTop: 30,
      paddingBottom: 4,
      paddingHorizontal: 15,
    },
    info: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
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
      position: "absolute",
      bottom: -10,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 40,
      width: 60,
      height: 32,
      borderWidth: 2,
      borderColor: colours.base,
      backgroundColor: colours.accent,
    },
    connections: {
      alignItems: "center",
      justifyContent: "center",
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
      alignItems: "center",
      justifyContent: "center",
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
