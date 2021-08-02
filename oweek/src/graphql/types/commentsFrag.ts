/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: commentsFrag
// ====================================================

export interface commentsFrag_comments_aggregate_aggregate {
  __typename: "comment_aggregate_fields";
  count: number | null;
}

export interface commentsFrag_comments_aggregate {
  __typename: "comment_aggregate";
  aggregate: commentsFrag_comments_aggregate_aggregate | null;
}

export interface commentsFrag {
  __typename: "post";
  /**
   * An aggregated array relationship
   */
  comments_aggregate: commentsFrag_comments_aggregate;
}
