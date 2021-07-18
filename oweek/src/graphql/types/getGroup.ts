/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getGroup
// ====================================================

export interface getGroup_group_members_aggregate_aggregate {
  __typename: "userGroup_aggregate_fields";
  count: number | null;
}

export interface getGroup_group_members_aggregate {
  __typename: "userGroup_aggregate";
  aggregate: getGroup_group_members_aggregate_aggregate | null;
}

export interface getGroup_group_members_user {
  __typename: "user";
  id: string;
  image: string;
}

export interface getGroup_group_members {
  __typename: "userGroup";
  /**
   * An object relationship
   */
  user: getGroup_group_members_user;
}

export interface getGroup_group {
  __typename: "group";
  id: any;
  name: string;
  image: string;
  /**
   * An aggregated array relationship
   */
  members_aggregate: getGroup_group_members_aggregate;
  /**
   * An array relationship
   */
  members: getGroup_group_members[];
}

export interface getGroup {
  /**
   * fetch data from the table: "group" using primary key columns
   */
  group: getGroup_group | null;
}

export interface getGroupVariables {
  id: any;
}
