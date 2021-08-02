import { gql } from '@apollo/client';
import { PostFragment } from '@graphql/Fragments';

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

export const DeletePost = gql`
  mutation deletePost($id: Int!) {
    delete_post_by_pk(id: $id) {
      id
    }
  }
`;

export const GetDetailedPost = gql`
  query getDetailedPost($postId: Int!) {
    post(id: $postId) {
      ...postFragment
    }
  }
  ${PostFragment}
`;

export const GetPostComments = gql`
  query getPostComments($postId: Int!, $offset: Int!) {
    post(id: $postId) {
      id
      comments(limit: 7, offset: $offset, order_by: { time: desc }) {
        id
        text
        time
        user {
          id
          image
          name
        }
      }
    }
  }
`;

export const AddComment = gql`
  mutation addComment($postId: Int!, $text: String!, $authorId: String!) {
    insert_comment_one(
      object: { authorId: $authorId, postId: $postId, text: $text }
    ) {
      id
    }
  }
`;


