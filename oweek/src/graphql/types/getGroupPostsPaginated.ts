/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getGroupPostsPaginated
// ====================================================

export interface getGroupPostsPaginated_group_posts_user {
  __typename: "user";
  id: string;
  name: string;
  image: string;
}

export interface getGroupPostsPaginated_group_posts_comments_aggregate_aggregate {
  __typename: "comment_aggregate_fields";
  count: number | null;
}

export interface getGroupPostsPaginated_group_posts_comments_aggregate {
  __typename: "comment_aggregate";
  aggregate: getGroupPostsPaginated_group_posts_comments_aggregate_aggregate | null;
}

export interface getGroupPostsPaginated_group_posts {
  __typename: "post";
  id: number;
  groupId: any;
  /**
   * An object relationship
   */
  user: getGroupPostsPaginated_group_posts_user;
  time: any;
  /**
   * An aggregated array relationship
   */
  comments_aggregate: getGroupPostsPaginated_group_posts_comments_aggregate;
  text: string;
  images: any | null;
  link: string | null;
}

export interface getGroupPostsPaginated_group {
  __typename: "group";
  id: any;
  /**
   * An array relationship
   */
  posts: getGroupPostsPaginated_group_posts[];
}

export interface getGroupPostsPaginated {
  /**
   * fetch data from the table: "group" using primary key columns
   */
  group: getGroupPostsPaginated_group | null;
}

export interface getGroupPostsPaginatedVariables {
  groupId: any;
  offset: number;
}
