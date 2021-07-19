/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DetailedChat
// ====================================================

export interface DetailedChat_participants {
  __typename: "chatUserView";
  id: string | null;
  _id: string | null;
  name: string | null;
  image: string | null;
}

export interface DetailedChat_messagesAggregate_aggregate {
  __typename: "message_aggregate_fields";
  count: number | null;
}

export interface DetailedChat_messagesAggregate {
  __typename: "message_aggregate";
  aggregate: DetailedChat_messagesAggregate_aggregate | null;
}

export interface DetailedChat_messages_user {
  __typename: "user";
  id: string;
  _id: string;
  name: string;
  avatar: string;
}

export interface DetailedChat_messages {
  __typename: "message";
  id: number;
  _id: number;
  text: string;
  createdAt: any;
  /**
   * An object relationship
   */
  user: DetailedChat_messages_user;
}

export interface DetailedChat {
  __typename: "chat";
  id: number;
  _id: number;
  name: string | null;
  image: string | null;
  /**
   * An array relationship
   */
  participants: DetailedChat_participants[];
  /**
   * An aggregated array relationship
   */
  messagesAggregate: DetailedChat_messagesAggregate;
  /**
   * An array relationship
   */
  messages: DetailedChat_messages[];
}
