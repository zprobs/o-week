/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addComment
// ====================================================

export interface addComment_insert_comment_one {
  __typename: "comment";
  id: number;
}

export interface addComment {
  /**
   * insert a single row into the table: "comment"
   */
  insert_comment_one: addComment_insert_comment_one | null;
}

export interface addCommentVariables {
  postId: number;
  text: string;
  authorId: string;
}
