/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: getMessages
// ====================================================

export interface getMessages_messages_user {
  __typename: "user";
  id: string;
  _id: string;
  name: string;
  avatar: string;
}

export interface getMessages_messages {
  __typename: "message";
  id: number;
  _id: number;
  text: string;
  createdAt: any;
  /**
   * An object relationship
   */
  user: getMessages_messages_user;
}

export interface getMessages {
  /**
   * fetch data from the table: "message"
   */
  messages: getMessages_messages[];
}

export interface getMessagesVariables {
  chatId: number;
  max: number;
}
