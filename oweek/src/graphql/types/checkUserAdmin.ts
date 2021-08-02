/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: checkUserAdmin
// ====================================================

export interface checkUserAdmin_user {
  __typename: "user";
  id: string;
  isAdmin: boolean;
  isLeader: boolean;
}

export interface checkUserAdmin {
  /**
   * fetch data from the table: "user" using primary key columns
   */
  user: checkUserAdmin_user | null;
}

export interface checkUserAdminVariables {
  id: string;
}
