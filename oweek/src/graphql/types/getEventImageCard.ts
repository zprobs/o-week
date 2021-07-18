/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getEventImageCard
// ====================================================

export interface getEventImageCard_event_attendees_user {
  __typename: "user";
  image: string;
  id: string;
}

export interface getEventImageCard_event_attendees {
  __typename: "userEvent";
  /**
   * An object relationship
   */
  user: getEventImageCard_event_attendees_user;
}

export interface getEventImageCard_event_attendees_aggregate_aggregate {
  __typename: "userEvent_aggregate_fields";
  count: number | null;
}

export interface getEventImageCard_event_attendees_aggregate {
  __typename: "userEvent_aggregate";
  aggregate: getEventImageCard_event_attendees_aggregate_aggregate | null;
}

export interface getEventImageCard_event {
  __typename: "event";
  id: any;
  name: string;
  image: string;
  /**
   * An array relationship
   */
  attendees: getEventImageCard_event_attendees[];
  /**
   * An aggregated array relationship
   */
  attendees_aggregate: getEventImageCard_event_attendees_aggregate;
}

export interface getEventImageCard {
  /**
   * fetch data from the table: "event" using primary key columns
   */
  event: getEventImageCard_event | null;
}

export interface getEventImageCardVariables {
  id: any;
}
