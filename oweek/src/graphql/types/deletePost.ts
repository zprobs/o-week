/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deletePost
// ====================================================

export interface deletePost_delete_post_by_pk {
  __typename: "post";
  id: number;
}

export interface deletePost {
  /**
   * delete single row from the table: "post"
   */
  delete_post_by_pk: deletePost_delete_post_by_pk | null;
}

export interface deletePostVariables {
  id: number;
}
