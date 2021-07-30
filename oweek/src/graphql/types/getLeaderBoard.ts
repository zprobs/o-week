/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getLeaderBoard
// ====================================================

export interface getLeaderBoard_groups_trophies_aggregate_aggregate_sum {
  __typename: "trophyGroupView_sum_fields";
  score: number | null;
}

export interface getLeaderBoard_groups_trophies_aggregate_aggregate {
  __typename: "trophyGroupView_aggregate_fields";
  sum: getLeaderBoard_groups_trophies_aggregate_aggregate_sum | null;
}

export interface getLeaderBoard_groups_trophies_aggregate {
  __typename: "trophyGroupView_aggregate";
  aggregate: getLeaderBoard_groups_trophies_aggregate_aggregate | null;
}

export interface getLeaderBoard_groups {
  __typename: "group";
  id: any;
  name: string;
  /**
   * An aggregated array relationship
   */
  trophies_aggregate: getLeaderBoard_groups_trophies_aggregate;
}

export interface getLeaderBoard {
  /**
   * fetch data from the table: "group"
   */
  groups: getLeaderBoard_groups[];
}
