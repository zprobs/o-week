/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MyMutation
// ====================================================

export interface MyMutation_update_userChat_returning {
  __typename: "userChat";
  seen: boolean;
}

export interface MyMutation_update_userChat {
  __typename: "userChat_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: MyMutation_update_userChat_returning[];
}

export interface MyMutation {
  /**
   * update data of the table: "userChat"
   */
  update_userChat: MyMutation_update_userChat | null;
}

export interface MyMutationVariables {
  chatId: number;
  participants: string[];
  seen?: boolean | null;
}
