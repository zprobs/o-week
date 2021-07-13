/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { user_set_input, user_pk_columns_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser_programs_program {
  __typename: "program";
  id: number;
  name: string;
}

export interface updateUser_updateUser_programs {
  __typename: "userProgram";
  programId: number;
  /**
   * An object relationship
   */
  program: updateUser_updateUser_programs_program;
}

export interface updateUser_updateUser_member_aggregate_aggregate {
  __typename: "userGroup_aggregate_fields";
  count: number | null;
}

export interface updateUser_updateUser_member_aggregate {
  __typename: "userGroup_aggregate";
  aggregate: updateUser_updateUser_member_aggregate_aggregate | null;
}

export interface updateUser_updateUser_friends_aggregate_aggregate {
  __typename: "friend_aggregate_fields";
  count: number | null;
}

export interface updateUser_updateUser_friends_aggregate {
  __typename: "friend_aggregate";
  aggregate: updateUser_updateUser_friends_aggregate_aggregate | null;
}

export interface updateUser_updateUser {
  __typename: "user";
  id: string;
  name: string;
  description: string | null;
  /**
   * An array relationship
   */
  programs: updateUser_updateUser_programs[];
  image: string;
  year: number;
  onlyFriendsCanMessage: boolean;
  isLeader: boolean;
  isAdmin: boolean;
  /**
   * An aggregated array relationship
   */
  member_aggregate: updateUser_updateUser_member_aggregate;
  /**
   * An aggregated array relationship
   */
  friends_aggregate: updateUser_updateUser_friends_aggregate;
}

export interface updateUser {
  /**
   * update single row of the table: "user"
   */
  updateUser: updateUser_updateUser | null;
}

export interface updateUserVariables {
  data: user_set_input;
  user: user_pk_columns_input;
}
