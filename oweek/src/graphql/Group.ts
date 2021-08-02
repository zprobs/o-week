import { gql } from '@apollo/client';
import {
  DetailedChat,
  MessageFragment,
  PostFragment,
} from '@graphql/Fragments';

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

export const GetDetailedGroup = gql`
  query getDetailedGroup($id: uuid!, $currentUser: String!) {
    group(id: $id) {
      id
      name
      image
      description
      members(where: { isOwner: { _eq: false } }, limit: 20) {
        user {
          id
          image
          name
        }
      }
      owners: members(where: { isOwner: { _eq: true } }, limit: 20) {
        user {
          id
          image
          name
        }
      }
      trophies {
        id
        name
        score
      }
      trophies_aggregate {
        aggregate {
          sum {
            score
          }
        }
      }
      events(limit: 50, order_by: { event: { startDate: desc } }) {
        event {
          id
        }
      }
      unsubscribable
      groupType
      phone
      groupChats(
        where: { chat: { users: { userId: { _eq: $currentUser } } } }
      ) {
        chat {
          ...DetailedChat
        }
      }
      allChats: groupChats {
        chatId
      }
      posts(limit: 4, order_by: { time: desc }) {
        ...postFragment
      }
      posts_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  ${DetailedChat}
  ${MessageFragment}
  ${PostFragment}
`;

export const GetGroupPosts = gql`
  query getGroupPosts($groupId: uuid!) {
    group(id: $groupId) {
      id
      posts(limit: 4, order_by: { time: desc }) {
        ...postFragment
      }
      posts_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  ${PostFragment}
`;

export const GetLeaderBoard = gql`
  query getLeaderBoard {
    groups(
      where: { groupType: { _eq: "orientation" } }
      order_by: { trophies_aggregate: { sum: { score: desc_nulls_last } } }
      limit: 25
    ) {
      id
      name
      trophies_aggregate {
        aggregate {
          sum {
            score
          }
        }
      }
    }
  }
`;
export const GetGroupMembersPaginated = gql`
  query getGroupMembersPaginated(
    $groupId: uuid!
    $offset: Int!
    $isOwner: Boolean!
  ) {
    group(id: $groupId) {
      id
      members(
        where: { isOwner: { _eq: $isOwner } }
        limit: 20
        offset: $offset
      ) {
        user {
          id
          name
          image
        }
      }
    }
  }
`;

export const GetGroupPostsPaginated = gql`
  query getGroupPostsPaginated($groupId: uuid!, $offset: Int!) {
    group(id: $groupId) {
      id
      posts(limit: 8, order_by: { time: desc }, offset: $offset) {
        ...postFragment
      }
    }
  }
  ${PostFragment}
`;
