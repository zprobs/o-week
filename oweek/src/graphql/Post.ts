import { gql } from '@apollo/client';

export const LikePost = gql`
  mutation likePost($postId: Int!, $userId: String!) {
    insert_like_one(object: { postId: $postId, userId: $userId }) {
      id
    }
  }
`;

export const UnlikePost = gql`
  mutation unLikePost($postId: Int!, $userId: String!) {
    delete_like_by_pk(postId: $postId, userId: $userId) {
      postId
    }
  }
`;
