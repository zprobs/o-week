/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRandomUsers
// ====================================================

export interface getRandomUsers_getrandomusers {
  __typename: "user";
  id: string;
  image: string;
}

export interface getRandomUsers {
  /**
   * execute function "getrandomusers" which returns "user"
   */
  getrandomusers: getRandomUsers_getrandomusers[];
}

export interface getRandomUsersVariables {
  userId: string;
}
