/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendNotification
// ====================================================

export interface sendNotification_sendNotification {
  __typename: "notification";
  id: number;
}

export interface sendNotification {
  /**
   * insert a single row into the table: "notification"
   */
  sendNotification: sendNotification_sendNotification | null;
}

export interface sendNotificationVariables {
  recipient: string;
  type: string;
  typeId: string;
}
