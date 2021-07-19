/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: postFragment
// ====================================================

export interface postFragment_user {
  __typename: "user";
  id: string;
  name: string;
  image: string;
}

export interface postFragment_comments_aggregate_aggregate {
  __typename: "comment_aggregate_fields";
  count: number | null;
}

export interface postFragment_comments_aggregate {
  __typename: "comment_aggregate";
  aggregate: postFragment_comments_aggregate_aggregate | null;
}

export interface postFragment {
  __typename: "post";
  id: number;
  groupId: any;
  /**
   * An object relationship
   */
  user: postFragment_user;
  time: any;
  /**
   * An aggregated array relationship
   */
  comments_aggregate: postFragment_comments_aggregate;
  text: string;
  images: any | null;
  link: string | null;
}
