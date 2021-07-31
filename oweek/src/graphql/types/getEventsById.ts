/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getEventsById
// ====================================================

export interface getEventsById_events_attendees_user {
  __typename: "user";
  id: string;
  image: string;
}

export interface getEventsById_events_attendees {
  __typename: "userEvent";
  /**
   * An object relationship
   */
  user: getEventsById_events_attendees_user;
}

export interface getEventsById_events_attendees_aggregate_aggregate {
  __typename: "userEvent_aggregate_fields";
  count: number | null;
}

export interface getEventsById_events_attendees_aggregate {
  __typename: "userEvent_aggregate";
  aggregate: getEventsById_events_attendees_aggregate_aggregate | null;
}

export interface getEventsById_events_hosts {
  __typename: "groupEvent";
  groupId: any;
}

export interface getEventsById_events {
  __typename: "event";
  id: any;
  image: string;
  name: string;
  startDate: any;
  description: string | null;
  /**
   * An array relationship
   */
  attendees: getEventsById_events_attendees[];
  /**
   * An aggregated array relationship
   */
  attendees_aggregate: getEventsById_events_attendees_aggregate;
  /**
   * An array relationship
   */
  hosts: getEventsById_events_hosts[];
}

export interface getEventsById {
  /**
   * fetch data from the table: "event"
   */
  events: getEventsById_events[];
}

export interface getEventsByIdVariables {
  _in: any[];
}
