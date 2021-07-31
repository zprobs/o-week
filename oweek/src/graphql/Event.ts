import { gql } from '@apollo/client';
import { EventAttendanceFragment } from '@graphql/Fragments';

export const GetEvent = gql`
  query getEvent($id: uuid!) {
    event(id: $id) {
      id
      name
      image
      startDate
      hosts {
        groupId
      }
    }
  }
`;

export const GetEventImageCard = gql`
  query getEventImageCard($id: uuid!) {
    event(id: $id) {
      id
      name
      image
      ...EventAttendance
    }
  }
  ${EventAttendanceFragment}
`;

export const GetEventsById = gql`
  query getEventsById($_in: [uuid!]!) {
    events(where: { id: { _in: $_in } }, order_by: { startDate: asc }) {
      id
      image
      name
      startDate
      description
      attendees(limit: 3) {
        user {
          id
          image
        }
      }
      attendees_aggregate {
        aggregate {
          count
        }
      }
      hosts {
        groupId
      }
    }
  }
`;
