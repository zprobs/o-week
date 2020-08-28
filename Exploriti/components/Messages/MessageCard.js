import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useRef } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';
import { AuthContext, parseTimeElapsed, processError } from '../../context';
import { useNavigation } from '@react-navigation/native';
import {
  UNSUBSCRIBE_FROM_CHAT,
  DELETE_CHAT,
  UPDATE_MESSAGE_SEEN,
} from '../../graphql';
import gql from 'graphql-tag';
import CardWithDeleteAction from '../ReusableComponents/CardWithDeleteAction';

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

const MessageCard = ({
  chatId,
  image,
  name,
  participants,
  senderId,
  messageBody,
  numMessages,
  messages,
  seen,
  time,
  isOnline,
  chatName,
  muted,
}) => {
  const HEIGHT = 65;
  const { authState } = useContext(AuthContext);
  const { readableTime } = parseTimeElapsed(time);
  const navigation = useNavigation();
  const [unsubscribeFromChat, { error: unsubscribeError }] = useMutation(
    UNSUBSCRIBE_FROM_CHAT,
    {
      variables: { chatId: chatId, userId: authState.user.uid },
    },
  );

  const [deleteChat] = useMutation(DELETE_CHAT, {
    variables: { chatId: chatId },
  });

  const remove = () => {
    if (participants.length <= 2) {
      deleteChat();
    } else {
      unsubscribeFromChat();
    }
  };

  const [setSeen] = useMutation(UPDATE_MESSAGE_SEEN, {
    variables: {
      chatId: chatId,
      participants: [authState.user.uid],
      seen: true,
    },
    update: (cache) => {
      const frag = gql`
        fragment usersChats on user {
          userChats(
            where: {
              _and: [{ chat: { messages: {} } }, { seen: { _eq: false } }]
            }
          ) {
            chatId
            seen
          }
        }
      `;

      try {
        const { userChats } = cache.readFragment({
          id: `user:${authState.user.uid}`,
          fragment: frag,
        });

        console.log('userChats', userChats);
        console.log('chatID', chatId);

        const newChats = userChats.filter((e) => e.chatId !== chatId);

        console.log('newChats', newChats);

        cache.writeFragment({
          id: `user:${authState.user.uid}`,
          fragment: frag,
          data: { __typename: 'user', userChats: newChats },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  if (unsubscribeError) processError(unsubscribeError, 'Cannot leave chat');

  const hasSetSeen = useRef(false);

  const isHighlighted = senderId !== authState.user.uid && !seen;

  console.log('msg seen', seen, chatId);

  if (senderId === authState.user.uid && !seen && !hasSetSeen.current) {
    hasSetSeen.current = true;
    setSeen();
  }

  const setSeenAndNavigate = () => {
    navigation.navigate('Conversation', {
      chatId,
      image,
      name,
      participants,
      numMessages,
      messages,
      isHighlighted,
      chatName,
      muted,
    });
  };

  const highlightStyle = isHighlighted
    ? {
        ...FontWeights.Regular,
        color: colours.text01,
      }
    : null;

  const onlineDotColor = ThemeStatic.onlineDotColor[isOnline];

  return (
    <CardWithDeleteAction
      Card={
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={setSeenAndNavigate}
            style={styles.touchable}>
            <View style={styles.avatar}>
              <Image source={{ uri: image }} style={styles.avatarImage} />
              <View
                style={[styles.onlineDot, { backgroundColor: onlineDotColor }]}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.nameText}>{name} </Text>
              <View style={styles.content}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.messageText, highlightStyle]}>
                  {messageBody}
                </Text>
                <Text style={[styles.timeText, highlightStyle]}>
                  {` · ${readableTime}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      }
      deleteFunction={remove}
      cardHeight={HEIGHT}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFFFF',
    paddingBottom: 50,
  },
  touchable: {
    flexDirection: 'row',
    borderRadius: 5,
    paddingLeft: 5,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    height: 50,
    width: 50,
  },
  avatarImage: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: colours.placeholder,
  },
  onlineDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    bottom: 2.5,
    right: 2.5,
    borderRadius: 10,
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
  content: {
    flexDirection: 'row',
    paddingTop: 5,
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    maxWidth: '70%',
    color: colours.text03,
  },
  timeText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: colours.text03,
  },
  remove: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E1E2E3',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    // position: 'absolute',
  },
});

export default MessageCard;
