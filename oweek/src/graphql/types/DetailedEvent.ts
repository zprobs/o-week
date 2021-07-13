/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DetailedEvent
// ====================================================

export interface DetailedEvent_attendees_user {
  __typename: "user";
  image: string;
  id: string;
  name: string;
}

export interface DetailedEvent_attendees {
  __typename: "userEvent";
  /**
   * An object relationship
   */
  user: DetailedEvent_attendees_user;
}

export interface DetailedEvent_attendees_aggregate_aggregate {
  __typename: "userEvent_aggregate_fields";
  count: number | null;
}

export interface DetailedEvent_attendees_aggregate {
  __typename: "userEvent_aggregate";
  aggregate: DetailedEvent_attendees_aggregate_aggregate | null;
}

export interface DetailedEvent_invited_user {
  __typename: "user";
  image: string;
  id: string;
  name: string;
}

export interface DetailedEvent_invited {
  __typename: "userEvent";
  /**
   * An object relationship
   */
  user: DetailedEvent_invited_user;
}

export interface DetailedEvent {
  __typename: "event";
  description: string | null;
  id: any;
  image: string;
  location: any;
  name: string;
  startDate: any;
  endDate: any;
  isOfficial: boolean;
  website: string | null;
  eventType: string | null;
  /**
   * An array relationship
   */
  attendees: DetailedEvent_attendees[];
  /**
   * An aggregated array relationship
   */
  attendees_aggregate: DetailedEvent_attendees_aggregate;
  /**
   * An array relationship
   */
  invited: DetailedEvent_invited[];
}
