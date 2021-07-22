import { gql } from '@apollo/client';
import { DetailedUserFragment } from './Fragments';

export const GetCurrentUser = gql`
  query getCurrentUser($id: String!) {
    user(id: $id) {
      ...DetailedUser
      member {
        isOwner
        group {
          id
        }
      }
    }
  }
  ${DetailedUserFragment}
`;

export const UpdateUser = gql`
  mutation updateUser($data: user_set_input!, $user: user_pk_columns_input!) {
    updateUser(_set: $data, pk_columns: $user) {
      ...DetailedUser
    }
  }
  ${DetailedUserFragment}
`;

export const GetRandomUsers = gql`
  query getRandomUsers($userId: String!) {
    getrandomusers(args: { userid: $userId }) {
      id
      image
    }
  }
`;

export const CheckUserLiked = gql`
  query checkUserLiked($postId: Int!, $userId: String!) {
    like(userId: $userId, postId: $postId) {
      userId
    }
    post(id: $postId) {
      id
      likes_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
