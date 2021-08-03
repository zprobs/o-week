/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getGroupMembers
// ====================================================

export interface getGroupMembers_group_members {
  __typename: "userGroup";
  userId: string;
}

export interface getGroupMembers_group {
  __typename: "group";
  id: any;
  /**
   * An array relationship
   */
  members: getGroupMembers_group_members[];
}

export interface getGroupMembers {
  /**
   * fetch data from the table: "group" using primary key columns
   */
  group: getGroupMembers_group | null;
}

export interface getGroupMembersVariables {
  groupId: any;
}
