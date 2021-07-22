/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { userNotification_insert_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: sendNotifications
// ====================================================

export interface sendNotifications_sendNotification {
  __typename: "notification";
  id: number;
}

export interface sendNotifications {
  /**
   * insert a single row into the table: "notification"
   */
  sendNotification: sendNotifications_sendNotification | null;
}

export interface sendNotificationsVariables {
  recipients: userNotification_insert_input[];
  type: string;
  typeId: string;
}
