import { gql } from '@apollo/client';

export const SendNotification = gql`
  mutation sendNotification(
    $recipient: String!
    $type: String!
    $typeId: String!
  ) {
    sendNotification(
      object: {
        type: $type
        typeId: $typeId
        userNotifications: { data: { userId: $recipient } }
      }
    ) {
      id
    }
  }
`;

export const SendNotifications = gql`
  mutation sendNotifications(
    $recipients: [userNotification_insert_input!]!
    $type: String!
    $typeId: String!
  ) {
    sendNotification(
      object: {
        type: $type
        typeId: $typeId
        userNotifications: { data: $recipients }
      }
    ) {
      id
    }
  }
`;
