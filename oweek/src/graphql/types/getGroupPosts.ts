/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getGroupPosts
// ====================================================

export interface getGroupPosts_group_posts_user {
  __typename: "user";
  id: string;
  name: string;
  image: string;
}

export interface getGroupPosts_group_posts_comments_aggregate_aggregate {
  __typename: "comment_aggregate_fields";
  count: number | null;
}

export interface getGroupPosts_group_posts_comments_aggregate {
  __typename: "comment_aggregate";
  aggregate: getGroupPosts_group_posts_comments_aggregate_aggregate | null;
}

export interface getGroupPosts_group_posts {
  __typename: "post";
  id: number;
  groupId: any;
  /**
   * An object relationship
   */
  user: getGroupPosts_group_posts_user;
  time: any;
  /**
   * An aggregated array relationship
   */
  comments_aggregate: getGroupPosts_group_posts_comments_aggregate;
  text: string;
  images: any | null;
  link: string | null;
}

export interface getGroupPosts_group_posts_aggregate_aggregate {
  __typename: "post_aggregate_fields";
  count: number | null;
}

export interface getGroupPosts_group_posts_aggregate {
  __typename: "post_aggregate";
  aggregate: getGroupPosts_group_posts_aggregate_aggregate | null;
}

export interface getGroupPosts_group {
  __typename: "group";
  id: any;
  /**
   * An array relationship
   */
  posts: getGroupPosts_group_posts[];
  /**
   * An aggregated array relationship
   */
  posts_aggregate: getGroupPosts_group_posts_aggregate;
}

export interface getGroupPosts {
  /**
   * fetch data from the table: "group" using primary key columns
   */
  group: getGroupPosts_group | null;
}

export interface getGroupPostsVariables {
  groupId: any;
}
