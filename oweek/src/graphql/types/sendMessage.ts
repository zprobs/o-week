/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendMessage
// ====================================================

export interface sendMessage_sendMessage {
  __typename: "message";
  id: number;
}

export interface sendMessage {
  /**
   * insert a single row into the table: "message"
   */
  sendMessage: sendMessage_sendMessage | null;
}

export interface sendMessageVariables {
  chatId: number;
  senderId: string;
  body: string;
}
