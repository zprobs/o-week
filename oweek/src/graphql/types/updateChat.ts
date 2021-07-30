/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { chat_set_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateChat
// ====================================================

export interface updateChat_update_chat_returning {
  __typename: "chat";
  id: number;
  image: string | null;
  name: string | null;
}

export interface updateChat_update_chat {
  __typename: "chat_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: updateChat_update_chat_returning[];
}

export interface updateChat {
  /**
   * update data of the table: "chat"
   */
  update_chat: updateChat_update_chat | null;
}

export interface updateChatVariables {
  id: number;
  _set: chat_set_input;
}
