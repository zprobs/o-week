/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateMessageSeen
// ====================================================

export interface updateMessageSeen_update_userChat_returning {
  __typename: "userChat";
  seen: boolean;
}

export interface updateMessageSeen_update_userChat {
  __typename: "userChat_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: updateMessageSeen_update_userChat_returning[];
}

export interface updateMessageSeen {
  /**
   * update data of the table: "userChat"
   */
  update_userChat: updateMessageSeen_update_userChat | null;
}

export interface updateMessageSeenVariables {
  chatId: number;
  participants: string[];
  seen?: boolean | null;
}
