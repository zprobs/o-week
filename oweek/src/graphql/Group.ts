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
  ${DETAILED_CHAT}
  ${MESSAGE_FRAGMENT}
  ${POST_FRAGMENT}
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
  ${POST_FRAGMENT}
`;
