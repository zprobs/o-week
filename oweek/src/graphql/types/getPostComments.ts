/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPostComments
// ====================================================

export interface getPostComments_post_comments_user {
  __typename: "user";
  id: string;
  image: string;
  name: string;
}

export interface getPostComments_post_comments {
  __typename: "comment";
  id: number;
  text: string;
  time: any;
  /**
   * An object relationship
   */
  user: getPostComments_post_comments_user;
}

export interface getPostComments_post {
  __typename: "post";
  id: number;
  /**
   * An array relationship
   */
  comments: getPostComments_post_comments[];
}

export interface getPostComments {
  /**
   * fetch data from the table: "post" using primary key columns
   */
  post: getPostComments_post | null;
}

export interface getPostCommentsVariables {
  postId: number;
  offset: number;
}
