/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: getNewMessages
// ====================================================

export interface getNewMessages_messages_user {
  __typename: "user";
  id: string;
  _id: string;
  name: string;
  avatar: string;
}

export interface getNewMessages_messages {
  __typename: "message";
  id: number;
  _id: number;
  text: string;
  createdAt: any;
  /**
   * An object relationship
   */
  user: getNewMessages_messages_user;
}

export interface getNewMessages {
  /**
   * fetch data from the table: "message"
   */
  messages: getNewMessages_messages[];
}

export interface getNewMessagesVariables {
  chatId: number;
  max: number;
}
