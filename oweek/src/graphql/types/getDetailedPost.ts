/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDetailedPost
// ====================================================

export interface getDetailedPost_post_user {
  __typename: "user";
  id: string;
  name: string;
  image: string;
}

export interface getDetailedPost_post_comments_aggregate_aggregate {
  __typename: "comment_aggregate_fields";
  count: number | null;
}

export interface getDetailedPost_post_comments_aggregate {
  __typename: "comment_aggregate";
  aggregate: getDetailedPost_post_comments_aggregate_aggregate | null;
}

export interface getDetailedPost_post {
  __typename: "post";
  id: number;
  groupId: any;
  /**
   * An object relationship
   */
  user: getDetailedPost_post_user;
  time: any;
  /**
   * An aggregated array relationship
   */
  comments_aggregate: getDetailedPost_post_comments_aggregate;
  text: string;
  images: any | null;
  link: string | null;
}

export interface getDetailedPost {
  /**
   * fetch data from the table: "post" using primary key columns
   */
  post: getDetailedPost_post | null;
}

export interface getDetailedPostVariables {
  postId: number;
}
