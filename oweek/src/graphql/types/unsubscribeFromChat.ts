/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unsubscribeFromChat
// ====================================================

export interface unsubscribeFromChat_unsubscribeFromChat {
  __typename: "userChat";
  chatId: number;
  userId: string;
}

export interface unsubscribeFromChat {
  /**
   * delete single row from the table: "userChat"
   */
  unsubscribeFromChat: unsubscribeFromChat_unsubscribeFromChat | null;
}

export interface unsubscribeFromChatVariables {
  chatId: number;
  userId: string;
}
