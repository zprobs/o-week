import React from 'react';
import { getDetailedGroup } from '@graphql/types/getDetailedGroup';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { GetLeaderBoard } from '@graphql/Group';
import { AddUsersToChat } from '@graphql/Chat';
import { useMutation, useQuery } from '@apollo/client';
import { processError, processWarning } from '@util/messages';
import { getLeaderBoard } from '@graphql/types/getLeaderBoard';
import {
  addUsersToChat,
  addUsersToChat_insert_userChat_returning_chat,
  addUsersToChatVariables,
} from '@graphql/types/addUsersToChat';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Modalize } from 'react-native-modalize';
import HorizontalUserList from '@components/list/HorizontalUserList';
import RankCard from '@components/card/RankCard';
import TrophyList from '@components/list/TrophyList';
import { rankData } from '@root/constants';
import useStyles from './About.styles';

interface Props {
  groupData?: getDetailedGroup;
  groupId: string;
  isMember: boolean;
  allLeadersRef: React.RefObject<Modalize>;
  allMembersRef: React.RefObject<Modalize>;
}

const About: React.FC<Props> = ({
  groupData,
  groupId,
  isMember,
  allLeadersRef,
  allMembersRef,
}) => {
  const navigation = useNavigation();
  const styles = useStyles();
  const {
    data: scoreData,
    loading: scoreLoading,
    error: scoreError,
  } = useQuery<getLeaderBoard>(GetLeaderBoard);

  const openGroupChat = (
    chat: addUsersToChat_insert_userChat_returning_chat,
  ) => {
    const {
      _id: chatId,
      image,
      name,
      participants,
      messagesAggregate,
      messages,
    } = chat;

    const numMessages = messagesAggregate.aggregate?.count || 0;

    navigation.navigate('Messages', {
      screen: 'Conversation',
      params: {
        chatId,
        image,
        name,
        participants,
        numMessages,
        messages,
      },
      initial: false,
    });
  };

  const [addToChat, { error: addToChatError }] = useMutation<
    addUsersToChat,
    addUsersToChatVariables
  >(AddUsersToChat, {
    onCompleted: (addToChatData) => {
      if (addToChatData.insert_userChat?.returning[0]?.chat) {
        openGroupChat(addToChatData.insert_userChat.returning[0].chat);
      } else {
        processWarning(
          { message: 'Could not find chat' },
          'Could not open chat',
        );
      }
    },
  });

  if (addToChatError) processError(addToChatError, 'Could not join chat');

  if (!groupData || scoreLoading || scoreError || !scoreData) return null;

  const rank = scoreData.groups?.findIndex((g) => g.id === groupId) || 0;
  const leaders = groupData.group?.owners?.map((o) => o.user) || [];
  const members = groupData.group?.members?.map((m) => m.user) || [];

  return (
    <>
      {isMember ? (
        <View style={styles.contactContainer}>
          {groupData.group?.phone ? (
            <TouchableOpacity
              style={styles.contactView}
              onPress={() => {
                Linking.openURL(`tel:${groupData.group?.phone}`).catch((e) => {
                  processError(e, 'Cannot call number');
                });
              }}>
              <Icon name="phone" size={18} style={styles.contactIcon} />
              <Text style={styles.contactText}>Call</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={styles.contactView}
            onPress={() => {
              if (groupData.group?.groupChats[0])
                openGroupChat(groupData.group.groupChats[0].chat);
              else {
                addToChat({
                  variables: {
                    objects: [
                      {
                        chatId: groupData.group?.allChats[0].chatId,
                        userId: 'MeacvK7z4gWhfkCC6jTNAfEKgXJ3',
                      },
                    ],
                  },
                }).catch((e) => processError(e, 'Could not join chat'));
              }
            }}>
            <Icon name="message-square" size={18} style={styles.contactIcon} />
            <Text style={styles.contactText}>Chat</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.sectionView}>
        <Text style={styles.sectionText}>Description</Text>
      </View>
      <Text style={styles.descriptionText}>{groupData.group?.description}</Text>

      <>
        {leaders.length > 0 ? (
          <>
            <View style={styles.sectionView}>
              <Text style={styles.sectionText}>Leaders</Text>
              {leaders.length >= 20 ? (
                <TouchableOpacity
                  style={styles.seeAllButton}
                  onPress={() => allLeadersRef.current?.open()}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <HorizontalUserList data={leaders} style={{ marginTop: 10 }} />
          </>
        ) : null}
        {members.length > 0 ? (
          <>
            <View style={styles.sectionView}>
              <Text style={styles.sectionText}>Members</Text>
              {members.length >= 20 ? (
                <TouchableOpacity
                  style={styles.seeAllButton}
                  onPress={() => allMembersRef.current?.open()}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <HorizontalUserList data={members} style={{ marginTop: 10 }} />
          </>
        ) : null}
      </>
      {groupData.group?.groupType === 'orientation' ? (
        <>
          <View style={styles.sectionView}>
            <Text style={styles.sectionText}>Leaderboard</Text>
          </View>
          <RankCard
            style={{ margin: 25, marginBottom: 5 }}
            onPress={() => navigation.navigate('Leaderboard', { groupId })}
            rank={rankData[rank]}
            gold
            team={groupData.group?.name}
            points={
              groupData.group?.trophies_aggregate.aggregate?.sum?.score || 0
            }
          />
          {(groupData.group?.trophies?.length || 0) > 0 ? (
            <>
              <View style={styles.sectionView}>
                <Text style={styles.sectionText}>Trophies</Text>
              </View>
              <TrophyList
                style={{ marginVertical: 25, marginBottom: 5 }}
                data={groupData.group?.trophies}
              />
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default About;
