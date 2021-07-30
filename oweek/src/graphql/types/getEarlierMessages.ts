/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getEarlierMessages
// ====================================================

export interface getEarlierMessages_messages_user {
  __typename: "user";
  id: string;
  _id: string;
  name: string;
  avatar: string;
}

export interface getEarlierMessages_messages {
  __typename: "message";
  id: number;
  _id: number;
  text: string;
  createdAt: any;
  /**
   * An object relationship
   */
  user: getEarlierMessages_messages_user;
}

export interface getEarlierMessages {
  /**
   * fetch data from the table: "message"
   */
  messages: getEarlierMessages_messages[];
}

export interface getEarlierMessagesVariables {
  chatId: number;
  offset: number;
  limit: number;
}
