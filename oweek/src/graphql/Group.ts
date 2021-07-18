import { gql } from '@apollo/client';

export const GetGroup = gql`
  query getGroup($id: uuid!) {
    group(id: $id) {
      id
      name
      image
      members_aggregate(where: { isOwner: { _eq: false } }) {
        aggregate {
          count
        }
      }
      members(limit: 3, where: { isOwner: { _eq: false } }) {
        user {
          id
          image
        }
      }
    }
  }
`;

export const GetGroupImageName = gql`
  query getGroupImageName($id: uuid!) {
    group(id: $id) {
      id
      name
      image
      groupType
    }
  }
`;