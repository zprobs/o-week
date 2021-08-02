/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserGroups
// ====================================================

export interface getUserGroups_user_member_group {
  __typename: "group";
  id: any;
  name: string;
  image: string;
}

export interface getUserGroups_user_member {
  __typename: "userGroup";
  isOwner: boolean;
  /**
   * An object relationship
   */
  group: getUserGroups_user_member_group;
}

export interface getUserGroups_user {
  __typename: "user";
  id: string;
  /**
   * An array relationship
   */
  member: getUserGroups_user_member[];
}

export interface getUserGroups {
  /**
   * fetch data from the table: "user" using primary key columns
   */
  user: getUserGroups_user | null;
}

export interface getUserGroupsVariables {
  id: string;
}
