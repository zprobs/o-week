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
import { ThemeStatic } from '../../theme/Colours';
import SearchableFlatList from '../Modal/SearchableFlatList';
import {
  BAN_USER,
  GET_ALL_GROUPS, GET_ALL_USERS,
  GET_ORIENTATION_GROUPS,
  GET_USER_FRIENDS_ID,
  SEARCH_USERS,
} from '../../graphql';
import GiveTrophyModal from '../Modal/GiveTrophyModal';
import NewEventModal from '../Modal/NewEventModal';
import GroupEditModal from '../Modal/GroupEditModal';
import { useMutation } from '@apollo/react-hooks';
const { FontWeights, FontSizes } = Fonts;
const { width } = Dimensions.get('window');

const AdminConsole = () => {
  const groupListRef = useRef();
  const groupEditRef = useRef();
  const newEventRef = useRef();
  const announcementRef = useRef();
  const banUserRef = useRef();
  const trophyRef = useRef();
  const [selected, setSelected] = useState();
  const [isAwardTrophies, setIsAwardTrophies] = useState(false); // award trophies and edit orientation group share searchable flatlist so this will differentiate which was tapped
  const isCreateGroup = useRef(false); // similar to trophies one group edit modal for edit orientation group and create orientation group

  const [banUser, { data: banData, error: banError }] = useMutation(BAN_USER);

  console.log('selected (AC)', selected);

  const openTrophyModal = () => {
    groupListRef.current.close();
    trophyRef.current.open();
  };

  const openGroupEditModal = () => {
    isCreateGroup.current = false;
    groupListRef.current.close();
    groupEditRef.current.open();
  };

  const openCreateOrientationGroupModal = () => {
    isCreateGroup.current = true;
    groupEditRef.current.open();
  };

  const openBanUserAlert = ({user}) => {
    Alert.alert(
      'This ban is irreversible',
      'If you ban this user, all their data will be deleted and they will not be able to sign up again with their current email address.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Ban',
          onPress: () =>
            banUser({
              variables: { id: selected[0] },
              update: (cache) => {
                const { users } = cache.readQuery({
                  query: GET_ALL_USERS,
                });
                const newUsers = users.filter(
                  (element) => element.id !== selected[0],
                );
                cache.writeQuery({
                  query: GET_ALL_USERS,
                  data: { users: newUsers },
                });
              },
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
            <Text style={styles.buttonText}>Edit Orientation Group</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#e31f8a' }]}
            onPress={() => banUserRef.current.open()}>
            <Text style={styles.buttonText}>Ban User</Text>
          </TouchableOpacity>
          <View style={[styles.button, { backgroundColor: '#6118c4' }]}>
            <Text style={styles.buttonText}>Create Orientation Group</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.button, { backgroundColor: '#b040c2' }]}>
            <Text style={styles.buttonText}>Send Announcement</Text>
          </View>
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
        setSelection={setSelected}
        floatingButtonText={'Next'}
        onPress={isAwardTrophies ? openTrophyModal : openGroupEditModal}
        clearOnClose={true}
        max={isAwardTrophies ? undefined : 1}
        min={1}
      />
      <GiveTrophyModal ref={trophyRef} selected={selected} />
      <NewEventModal ref={newEventRef} />
      <GroupEditModal
        ref={groupEditRef}
        groupId={selected ? selected[0] : null}
        create={isCreateGroup.current}
      />
      <SearchableFlatList
        query={SEARCH_USERS}
        hasImage={true}
        ref={banUserRef}
        title={'users'}
        offset={80}
        setSelection={setSelected}
        floatingButtonText={'Permanently Ban'}
        onPress={openBanUserAlert}
        clearOnClose={true}
        max={1}
        min={1}
        serverSearch={true}
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
