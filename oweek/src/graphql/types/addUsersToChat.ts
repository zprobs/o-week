/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { userChat_insert_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addUsersToChat
// ====================================================

export interface addUsersToChat_insert_userChat_returning_chat_participants {
  __typename: "chatUserView";
  id: string | null;
  _id: string | null;
  name: string | null;
  image: string | null;
}

export interface addUsersToChat_insert_userChat_returning_chat_messagesAggregate_aggregate {
  __typename: "message_aggregate_fields";
  count: number | null;
}

export interface addUsersToChat_insert_userChat_returning_chat_messagesAggregate {
  __typename: "message_aggregate";
  aggregate: addUsersToChat_insert_userChat_returning_chat_messagesAggregate_aggregate | null;
}

export interface addUsersToChat_insert_userChat_returning_chat_messages_user {
  __typename: "user";
  id: string;
  _id: string;
  name: string;
  avatar: string;
}

export interface addUsersToChat_insert_userChat_returning_chat_messages {
  __typename: "message";
  id: number;
  _id: number;
  text: string;
  createdAt: any;
  /**
   * An object relationship
   */
  user: addUsersToChat_insert_userChat_returning_chat_messages_user;
}

export interface addUsersToChat_insert_userChat_returning_chat {
  __typename: "chat";
  id: number;
  _id: number;
  name: string | null;
  image: string | null;
  /**
   * An array relationship
   */
  participants: addUsersToChat_insert_userChat_returning_chat_participants[];
  /**
   * An aggregated array relationship
   */
  messagesAggregate: addUsersToChat_insert_userChat_returning_chat_messagesAggregate;
  /**
   * An array relationship
   */
  messages: addUsersToChat_insert_userChat_returning_chat_messages[];
}

export interface addUsersToChat_insert_userChat_returning {
  __typename: "userChat";
  /**
   * An object relationship
   */
  chat: addUsersToChat_insert_userChat_returning_chat;
}

export interface addUsersToChat_insert_userChat {
  __typename: "userChat_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: addUsersToChat_insert_userChat_returning[];
}

export interface addUsersToChat {
  /**
   * insert data into the table: "userChat"
   */
  insert_userChat: addUsersToChat_insert_userChat | null;
}

export interface addUsersToChatVariables {
  objects: userChat_insert_input[];
}
