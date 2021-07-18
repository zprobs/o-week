/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getEvent
// ====================================================

export interface getEvent_event_hosts {
  __typename: "groupEvent";
  groupId: any;
}

export interface getEvent_event {
  __typename: "event";
  id: any;
  name: string;
  image: string;
  startDate: any;
  /**
   * An array relationship
   */
  hosts: getEvent_event_hosts[];
}

export interface getEvent {
  /**
   * fetch data from the table: "event" using primary key columns
   */
  event: getEvent_event | null;
}

export interface getEventVariables {
  id: any;
}
