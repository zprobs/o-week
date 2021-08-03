/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPost
// ====================================================

export interface createPost_insert_post_one {
  __typename: "post";
  id: number;
}

export interface createPost {
  /**
   * insert a single row into the table: "post"
   */
  insert_post_one: createPost_insert_post_one | null;
}

export interface createPostVariables {
  userId: string;
  groupId: any;
  text: string;
  images?: any | null;
  link?: string | null;
}
