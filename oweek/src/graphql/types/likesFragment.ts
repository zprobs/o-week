/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: likesFragment
// ====================================================

export interface likesFragment_likes_aggregate_aggregate {
  __typename: "like_aggregate_fields";
  count: number | null;
}

export interface likesFragment_likes_aggregate {
  __typename: "like_aggregate";
  aggregate: likesFragment_likes_aggregate_aggregate | null;
}

export interface likesFragment {
  __typename: "post";
  /**
   * An aggregated array relationship
   */
  likes_aggregate: likesFragment_likes_aggregate;
}
