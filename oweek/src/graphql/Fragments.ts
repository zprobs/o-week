import { gql } from '@apollo/client';

export const DetailedUserFragment = gql`
  fragment DetailedUser on user {
    id
    name
    description
    programs {
      programId
      program {
        id
        name
      }
    }
    image
    year
    onlyFriendsCanMessage
    isLeader
    isAdmin
    member_aggregate {
      aggregate {
        count
      }
    }
    friends_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const DetailedEventFragment = gql`
  fragment DetailedEvent on event {
    description
    id
    image
    location

    name
    startDate
    endDate
    isOfficial
    website
    eventType
    attendees(where: { didAccept: { _eq: true } }, limit: 20) {
      user {
        image
        id
        name
      }
    }
    attendees_aggregate {
      aggregate {
        count
      }
    }
    invited: attendees(where: { didAccept: { _eq: false } }, limit: 20) {
      user {
        image
        id
        name
      }
    }
  }
`;
