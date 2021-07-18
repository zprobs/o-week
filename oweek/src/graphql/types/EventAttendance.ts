/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EventAttendance
// ====================================================

export interface EventAttendance_attendees_user {
  __typename: "user";
  image: string;
  id: string;
}

export interface EventAttendance_attendees {
  __typename: "userEvent";
  /**
   * An object relationship
   */
  user: EventAttendance_attendees_user;
}

export interface EventAttendance_attendees_aggregate_aggregate {
  __typename: "userEvent_aggregate_fields";
  count: number | null;
}

export interface EventAttendance_attendees_aggregate {
  __typename: "userEvent_aggregate";
  aggregate: EventAttendance_attendees_aggregate_aggregate | null;
}

export interface EventAttendance {
  __typename: "event";
  id: any;
  /**
   * An array relationship
   */
  attendees: EventAttendance_attendees[];
  /**
   * An aggregated array relationship
   */
  attendees_aggregate: EventAttendance_attendees_aggregate;
}
