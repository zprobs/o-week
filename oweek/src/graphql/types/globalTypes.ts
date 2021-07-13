/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * primary key columns input for table: "user"
 */
export interface user_pk_columns_input {
  id: string;
}

/**
 * input type for updating data in table "user"
 */
export interface user_set_input {
  college?: string | null;
  description?: string | null;
  email?: string | null;
  id?: string | null;
  image?: string | null;
  isAdmin?: boolean | null;
  isLeader?: boolean | null;
  links?: any | null;
  muteEvents?: boolean | null;
  muteGroups?: boolean | null;
  muteMessages?: boolean | null;
  muteUsers?: boolean | null;
  name?: string | null;
  notificationToken?: string | null;
  onlyFriendsCanMessage?: boolean | null;
  timezone?: string | null;
  year?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
