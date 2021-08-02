/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: checkUserBlocked
// ====================================================

export interface checkUserBlocked_block {
  __typename: "block";
  blockedId: string;
  blockerId: string;
}

export interface checkUserBlocked {
  /**
   * fetch data from the table: "block"
   */
  block: checkUserBlocked_block[];
}

export interface checkUserBlockedVariables {
  blockedId: string;
  blockerId: string;
}
