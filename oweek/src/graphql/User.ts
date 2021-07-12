import { gql } from '@apollo/client';
import { DETAILED_USER_FRAGMENT } from './Fragments';

export const GET_CURRENT_USER = gql`
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
  ${DETAILED_USER_FRAGMENT}
`;

export const UPDATE_USER = gql`
  mutation updateUser($data: user_set_input!, $user: user_pk_columns_input!) {
    updateUser(_set: $data, pk_columns: $user) {
      ...DetailedUser
    }
  }
  ${DETAILED_USER_FRAGMENT}
`;
