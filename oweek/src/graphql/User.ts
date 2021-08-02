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

export const CheckUserAdmin = gql`
  query checkUserAdmin($id: String!) {
    user(id: $id) {
      id
      isAdmin
      isLeader
    }
  }
`;

export const GetUserGroups = gql`
  query getUserGroups($id: String!) {
    user(id: $id) {
      id
      member {
        isOwner
        group {
          id
          name
          image
        }
      }
    }
  }
`;

export const BlockUser = gql`
  mutation blockUser($blockedId: String!, $blockerId: String!) {
    blockUser(object: { blockedId: $blockedId, blockerId: $blockerId }) {
      blockedId
      blockerId
    }
  }
`;

export const CheckUserBlocked = gql`
  query checkUserBlocked($blockedId: String!, $blockerId: String!) {
    block(
      where: { blockedId: { _eq: $blockedId }, blockerId: { _eq: $blockerId } }
    ) {
      blockedId
      blockerId
    }
  }
`;

export const ReportUser = gql`
  mutation reportUser(
    $reporter: String!
    $reported: String!
    $postId: Int = null
    $commentId: Int = null
  ) {
    insert_report(
      objects: {
        reporter: $reporter
        reported: $reported
        post: $postId
        comment: $commentId
      }
    ) {
      affected_rows
    }
  }
`;

export const UnblockUser = gql`
  mutation unBlockUser($blockedId: String!, $blockerId: String!) {
    unblockUser(
      where: { blockedId: { _eq: $blockedId }, blockerId: { _eq: $blockerId } }
    ) {
      affected_rows
    }
  }
`;
