/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getGroupImageName
// ====================================================

export interface getGroupImageName_group {
  __typename: "group";
  id: any;
  name: string;
  image: string;
  groupType: string;
}

export interface getGroupImageName {
  /**
   * fetch data from the table: "group" using primary key columns
   */
  group: getGroupImageName_group | null;
}

export interface getGroupImageNameVariables {
  id: any;
}
