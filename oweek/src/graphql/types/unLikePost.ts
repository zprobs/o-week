/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unLikePost
// ====================================================

export interface unLikePost_delete_like_by_pk {
  __typename: "like";
  postId: number;
}

export interface unLikePost {
  /**
   * delete single row from the table: "like"
   */
  delete_like_by_pk: unLikePost_delete_like_by_pk | null;
}

export interface unLikePostVariables {
  postId: number;
  userId: string;
}
