/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: reportUser
// ====================================================

export interface reportUser_insert_report {
  __typename: "report_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface reportUser {
  /**
   * insert data into the table: "report"
   */
  insert_report: reportUser_insert_report | null;
}

export interface reportUserVariables {
  reporter: string;
  reported: string;
  postId?: number | null;
  commentId?: number | null;
}
