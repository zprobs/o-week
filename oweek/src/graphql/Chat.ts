import { gql } from '@apollo/client';
import { DetailedChat, MessageFragment } from '@graphql/Fragments';

export const AddUsersToChat = gql`
  mutation addUsersToChat($objects: [userChat_insert_input!]!) {
    insert_userChat(objects: $objects) {
      returning {
        chat {
          ...DetailedChat
        }
      }
    }
  }
  ${DetailedChat}
  ${MessageFragment}
`;

export const UnsubscribeFromChat = gql`
  mutation unsubscribeFromChat($chatId: Int!, $userId: String!) {
    unsubscribeFromChat(chatId: $chatId, userId: $userId) {
      chatId
      userId
    }
  }
`;

export const DeleteChat = gql`
  mutation deleteChat($chatId: Int!) {
    deleteChat(id: $chatId) {
      id
    }
  }
`;

export const UpdateChat = gql`
  mutation updateChat($id: Int!, $_set: chat_set_input!) {
    update_chat(where: { id: { _eq: $id } }, _set: $_set) {
      returning {
        id
        image
        name
      }
    }
  }
`;

export const GetNewMessages = gql`
  subscription getNewMessages($chatId: Int!, $max: Int!) {
    messages(
      where: { _and: [{ chatId: { _eq: $chatId } }, { id: { _gt: $max } }] }
      order_by: { date: desc }
    ) {
      ...DetailedMessage
    }
  }
  ${MessageFragment}
`;

export const GetEarlierMessages = gql`
  query getEarlierMessages($chatId: Int!, $offset: Int!, $limit: Int!) {
    messages(
      where: { chatId: { _eq: $chatId } }
      offset: $offset
      limit: $limit
      order_by: { date: desc }
    ) {
      ...DetailedMessage
    }
  }
  ${MessageFragment}
`;

export const SendMessage = gql`
  mutation sendMessage($chatId: Int!, $senderId: String!, $body: String!) {
    sendMessage(object: { chatId: $chatId, senderId: $senderId, body: $body }) {
      id
    }
  }
`;

export const UpdateMessageSeen = gql`
  mutation updateMessageSeen(
    $chatId: Int!
    $participants: [String!]!
    $seen: Boolean
  ) {
    update_userChat(
      where: { chatId: { _eq: $chatId }, userId: { _in: $participants } }
      _set: { seen: $seen }
    ) {
      returning {
        seen
      }
    }
  }
`;
