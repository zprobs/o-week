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
