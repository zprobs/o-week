/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: likePost
// ====================================================

export interface likePost_insert_like_one {
  __typename: "like";
  id: number;
}

export interface likePost {
  /**
   * insert a single row into the table: "like"
   */
  insert_like_one: likePost_insert_like_one | null;
}

export interface likePostVariables {
  postId: number;
  userId: string;
}
