/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { userChat_insert_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: insert_userChat
// ====================================================

export interface insert_userChat_insert_userChat_returning_chat_participants {
  __typename: "chatUserView";
  id: string | null;
  _id: string | null;
  name: string | null;
  image: string | null;
}

export interface insert_userChat_insert_userChat_returning_chat_messagesAggregate_aggregate {
  __typename: "message_aggregate_fields";
  count: number | null;
}

export interface insert_userChat_insert_userChat_returning_chat_messagesAggregate {
  __typename: "message_aggregate";
  aggregate: insert_userChat_insert_userChat_returning_chat_messagesAggregate_aggregate | null;
}

export interface insert_userChat_insert_userChat_returning_chat_messages_user {
  __typename: "user";
  id: string;
  _id: string;
  name: string;
  avatar: string;
}

export interface insert_userChat_insert_userChat_returning_chat_messages {
  __typename: "message";
  id: number;
  _id: number;
  text: string;
  createdAt: any;
  /**
   * An object relationship
   */
  user: insert_userChat_insert_userChat_returning_chat_messages_user;
}

export interface insert_userChat_insert_userChat_returning_chat {
  __typename: "chat";
  id: number;
  _id: number;
  name: string | null;
  image: string | null;
  /**
   * An array relationship
   */
  participants: insert_userChat_insert_userChat_returning_chat_participants[];
  /**
   * An aggregated array relationship
   */
  messagesAggregate: insert_userChat_insert_userChat_returning_chat_messagesAggregate;
  /**
   * An array relationship
   */
  messages: insert_userChat_insert_userChat_returning_chat_messages[];
}

export interface insert_userChat_insert_userChat_returning {
  __typename: "userChat";
  /**
   * An object relationship
   */
  chat: insert_userChat_insert_userChat_returning_chat;
}

export interface insert_userChat_insert_userChat {
  __typename: "userChat_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: insert_userChat_insert_userChat_returning[];
}

export interface insert_userChat {
  /**
   * insert data into the table: "userChat"
   */
  insert_userChat: insert_userChat_insert_userChat | null;
}

export interface insert_userChatVariables {
  objects: userChat_insert_input[];
}
