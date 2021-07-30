/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteChat
// ====================================================

export interface deleteChat_deleteChat {
  __typename: "chat";
  id: number;
}

export interface deleteChat {
  /**
   * delete single row from the table: "chat"
   */
  deleteChat: deleteChat_deleteChat | null;
}

export interface deleteChatVariables {
  chatId: number;
}
