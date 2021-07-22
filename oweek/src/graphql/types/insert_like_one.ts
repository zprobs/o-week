/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: insert_like_one
// ====================================================

export interface insert_like_one_insert_like_one {
  __typename: "like";
  id: number;
}

export interface insert_like_one {
  /**
   * insert a single row into the table: "like"
   */
  insert_like_one: insert_like_one_insert_like_one | null;
}

export interface insert_like_oneVariables {
  postId: number;
  userId: string;
}
