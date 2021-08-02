/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: blockUser
// ====================================================

export interface blockUser_blockUser {
  __typename: "block";
  blockedId: string;
  blockerId: string;
}

export interface blockUser {
  /**
   * insert a single row into the table: "block"
   */
  blockUser: blockUser_blockUser | null;
}

export interface blockUserVariables {
  blockedId: string;
  blockerId: string;
}
