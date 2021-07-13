/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DetailedUser
// ====================================================

export interface DetailedUser_programs_program {
  __typename: "program";
  id: number;
  name: string;
}

export interface DetailedUser_programs {
  __typename: "userProgram";
  programId: number;
  /**
   * An object relationship
   */
  program: DetailedUser_programs_program;
}

export interface DetailedUser_member_aggregate_aggregate {
  __typename: "userGroup_aggregate_fields";
  count: number | null;
}

export interface DetailedUser_member_aggregate {
  __typename: "userGroup_aggregate";
  aggregate: DetailedUser_member_aggregate_aggregate | null;
}

export interface DetailedUser_friends_aggregate_aggregate {
  __typename: "friend_aggregate_fields";
  count: number | null;
}

export interface DetailedUser_friends_aggregate {
  __typename: "friend_aggregate";
  aggregate: DetailedUser_friends_aggregate_aggregate | null;
}

export interface DetailedUser {
  __typename: "user";
  id: string;
  name: string;
  description: string | null;
  /**
   * An array relationship
   */
  programs: DetailedUser_programs[];
  image: string;
  year: number;
  onlyFriendsCanMessage: boolean;
  isLeader: boolean;
  isAdmin: boolean;
  /**
   * An aggregated array relationship
   */
  member_aggregate: DetailedUser_member_aggregate;
  /**
   * An aggregated array relationship
   */
  friends_aggregate: DetailedUser_friends_aggregate;
}
