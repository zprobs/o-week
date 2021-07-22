/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: checkUserLiked
// ====================================================

export interface checkUserLiked_like {
  __typename: "like";
  userId: string;
}

export interface checkUserLiked_post_likes_aggregate_aggregate {
  __typename: "like_aggregate_fields";
  count: number | null;
}

export interface checkUserLiked_post_likes_aggregate {
  __typename: "like_aggregate";
  aggregate: checkUserLiked_post_likes_aggregate_aggregate | null;
}

export interface checkUserLiked_post {
  __typename: "post";
  id: number;
  /**
   * An aggregated array relationship
   */
  likes_aggregate: checkUserLiked_post_likes_aggregate;
}

export interface checkUserLiked {
  /**
   * fetch data from the table: "like" using primary key columns
   */
  like: checkUserLiked_like | null;
  /**
   * fetch data from the table: "post" using primary key columns
   */
  post: checkUserLiked_post | null;
}

export interface checkUserLikedVariables {
  postId: number;
  userId: string;
}
