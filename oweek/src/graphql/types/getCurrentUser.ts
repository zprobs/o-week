/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCurrentUser
// ====================================================

export interface getCurrentUser_user_programs_program {
  __typename: "program";
  id: number;
  name: string;
}

export interface getCurrentUser_user_programs {
  __typename: "userProgram";
  programId: number;
  /**
   * An object relationship
   */
  program: getCurrentUser_user_programs_program;
}

export interface getCurrentUser_user_member_aggregate_aggregate {
  __typename: "userGroup_aggregate_fields";
  count: number | null;
}

export interface getCurrentUser_user_member_aggregate {
  __typename: "userGroup_aggregate";
  aggregate: getCurrentUser_user_member_aggregate_aggregate | null;
}

export interface getCurrentUser_user_friends_aggregate_aggregate {
  __typename: "friend_aggregate_fields";
  count: number | null;
}

export interface getCurrentUser_user_friends_aggregate {
  __typename: "friend_aggregate";
  aggregate: getCurrentUser_user_friends_aggregate_aggregate | null;
}

export interface getCurrentUser_user_member_group {
  __typename: "group";
  id: any;
}

export interface getCurrentUser_user_member {
  __typename: "userGroup";
  isOwner: boolean;
  /**
   * An object relationship
   */
  group: getCurrentUser_user_member_group;
}

export interface getCurrentUser_user {
  __typename: "user";
  id: string;
  name: string;
  description: string | null;
  /**
   * An array relationship
   */
  programs: getCurrentUser_user_programs[];
  image: string;
  year: number;
  onlyFriendsCanMessage: boolean;
  isLeader: boolean;
  isAdmin: boolean;
  /**
   * An aggregated array relationship
   */
  member_aggregate: getCurrentUser_user_member_aggregate;
  /**
   * An aggregated array relationship
   */
  friends_aggregate: getCurrentUser_user_friends_aggregate;
  /**
   * An array relationship
   */
  member: getCurrentUser_user_member[];
}

export interface getCurrentUser {
  /**
   * fetch data from the table: "user" using primary key columns
   */
  user: getCurrentUser_user | null;
}

export interface getCurrentUserVariables {
  id: string;
}
