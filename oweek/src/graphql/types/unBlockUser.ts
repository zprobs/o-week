/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unBlockUser
// ====================================================

export interface unBlockUser_unblockUser {
  __typename: "block_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface unBlockUser {
  /**
   * delete data from the table: "block"
   */
  unblockUser: unBlockUser_unblockUser | null;
}

export interface unBlockUserVariables {
  blockedId: string;
  blockerId: string;
}
