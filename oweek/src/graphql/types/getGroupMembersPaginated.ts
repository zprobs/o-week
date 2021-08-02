/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getGroupMembersPaginated
// ====================================================

export interface getGroupMembersPaginated_group_members_user {
  __typename: "user";
  id: string;
  name: string;
  image: string;
}

export interface getGroupMembersPaginated_group_members {
  __typename: "userGroup";
  /**
   * An object relationship
   */
  user: getGroupMembersPaginated_group_members_user;
}

export interface getGroupMembersPaginated_group {
  __typename: "group";
  id: any;
  /**
   * An array relationship
   */
  members: getGroupMembersPaginated_group_members[];
}

export interface getGroupMembersPaginated {
  /**
   * fetch data from the table: "group" using primary key columns
   */
  group: getGroupMembersPaginated_group | null;
}

export interface getGroupMembersPaginatedVariables {
  groupId: any;
  offset: number;
  isOwner: boolean;
}
