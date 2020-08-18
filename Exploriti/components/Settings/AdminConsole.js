import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Fonts from '../../theme/Fonts';
import SearchableFlatList from '../Modal/SearchableFlatList';
import {
  BAN_USER,
  GET_ORIENTATION_GROUPS,
  SEARCH_USERS,
} from '../../graphql';
import GiveTrophyModal from '../Modal/GiveTrophyModal';
import NewEventModal from '../Modal/NewEventModal';
import GroupEditModal from '../Modal/GroupEditModal';
import { useMutation } from '@apollo/react-hooks';
import SendAnnouncementModal from '../Modal/SendAnnouncementModal';
const { FontWeights, FontSizes } = Fonts;
const { width } = Dimensions.get('window');

const AdminConsole = () => {
  const groupListRef = useRef();
  const groupEditRef = useRef();
  const newEventRef = useRef();
  const announcementRef = useRef();
  const banUserRef = useRef();
  const trophyRef = useRef();
  const [groupSelected, setGroupSelected] = useState();
  const [userSelected, setUserSelected] = useState();
  const [isAwardTrophies, setIsAwardTrophies] = useState(false); // award trophies and edit orientation group share searchable flatlist so this will differentiate which was tapped
  const [isCreateGroup, setIsCreateGroup] = useState(false); // similar to trophies one group edit modal for edit orientation group and create orientation group

  const [banUser, { data: banData, error: banError }] = useMutation(BAN_USER);

  console.log('groupSelected (AC)', groupSelected);
  console.log('userSelected (AC)', userSelected);

  const openTrophyModal = () => {
    groupListRef.current.close();
    trophyRef.current.open();
  };

  const openGroupEditModal = () => {
    setIsCreateGroup(false);
    groupListRef.current.close();
    groupEditRef.current.open();
  };

  const openCreateGroupModal = () => {
    setIsCreateGroup(true);
    groupEditRef.current.open();
  };

  const openAnnouncementModal = () => {
    announcementRef.current.open();
  }

  const openBanUserAlert = ({user}) => {
    console.log('user', user)
    console.log('user sleected', userSelected)
    Alert.alert(
      'This ban is irreversible',
      'If you ban this user, all their data will be deleted and they will not be able to sign up again with their current email address. Restart the app to see changes.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Ban',
          onPress: () =>
            banUser({
              variables: { id: userSelected[0] },
            }),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#e84f8a' }]}
            onPress={() => newEventRef.current.open()}>
            <Text style={styles.buttonText}>Create Global Event</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#7d38c4' }]}
            onPress={() => {
              setIsAwardTrophies(false);
              groupListRef.current.open();
            }}>
            <Text style={styles.buttonText}>Edit Group</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#e31f8a' }]}
            onPress={() => banUserRef.current.open()}>
            <Text style={styles.buttonText}>Ban User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#6118c4' }]} onPress={openCreateGroupModal}>
            <Text style={styles.buttonText}>Create Group</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#b040c2' }]} onPress={openAnnouncementModal}>
            <Text style={styles.buttonText}>Send Announcement</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4118c4' }]}
            onPress={() => {
              setIsAwardTrophies(true);
              groupListRef.current.open();
            }}>
            <Text style={styles.buttonText}>Award Trophy</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </SafeAreaView>
      <SearchableFlatList
        query={GET_ORIENTATION_GROUPS}
        hasImage={true}
        ref={groupListRef}
        title={'groups'}
        offset={80}
        setSelection={setGroupSelected}
        floatingButtonText={'Next'}
        onPress={isAwardTrophies ? openTrophyModal : openGroupEditModal}
        clearOnClose={true}
        max={isAwardTrophies ? undefined : 1}
        min={1}
      />
      <GiveTrophyModal ref={trophyRef} selected={groupSelected} />
      <NewEventModal ref={newEventRef} />
      <GroupEditModal
        ref={groupEditRef}
        groupId={groupSelected ? groupSelected[0] : null}
        create={isCreateGroup}
        SFLOffset={0}
      />
      <SearchableFlatList
        query={SEARCH_USERS}
        hasImage={true}
        ref={banUserRef}
        title={'users'}
        offset={80}
        setSelection={setUserSelected}
        floatingButtonText={'Permanently Ban'}
        onPress={openBanUserAlert}
        clearOnClose={true}
        max={1}
        min={1}
        serverSearch={true}
      />
      <SendAnnouncementModal
        ref={announcementRef}
        />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    width: width * 0.4,
    height: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...FontWeights.Bold,
    ...FontSizes.Label,
    color: 'white',
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '98%',
  },
});

export default AdminConsole;
