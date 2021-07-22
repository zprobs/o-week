/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * unique or primary key constraints on table "block"
 */
export enum block_constraint {
  block_pkey = "block_pkey",
}

/**
 * update columns of table "block"
 */
export enum block_update_column {
  blockedId = "blockedId",
  blockerId = "blockerId",
}

/**
 * unique or primary key constraints on table "chat"
 */
export enum chat_constraint {
  chat_pkey = "chat_pkey",
}

/**
 * update columns of table "chat"
 */
export enum chat_update_column {
  id = "id",
  image = "image",
  name = "name",
  unsubscribable = "unsubscribable",
}

/**
 * unique or primary key constraints on table "comment"
 */
export enum comment_constraint {
  comment_id_key = "comment_id_key",
  comment_pkey = "comment_pkey",
}

/**
 * update columns of table "comment"
 */
export enum comment_update_column {
  authorId = "authorId",
  id = "id",
  postId = "postId",
  text = "text",
  time = "time",
}

/**
 * unique or primary key constraints on table "event"
 */
export enum event_constraint {
  event_id_key = "event_id_key",
  event_pkey = "event_pkey",
}

/**
 * update columns of table "event"
 */
export enum event_update_column {
  description = "description",
  email = "email",
  endDate = "endDate",
  eventType = "eventType",
  gallery = "gallery",
  id = "id",
  image = "image",
  isOfficial = "isOfficial",
  isZoom = "isZoom",
  links = "links",
  location = "location",
  name = "name",
  startDate = "startDate",
  website = "website",
}

/**
 * unique or primary key constraints on table "friendRequest"
 */
export enum friendRequest_constraint {
  pendingFriend_pkey = "pendingFriend_pkey",
}

/**
 * update columns of table "friendRequest"
 */
export enum friendRequest_update_column {
  date = "date",
  recipient = "recipient",
  sender = "sender",
}

/**
 * unique or primary key constraints on table "friend"
 */
export enum friend_constraint {
  friend_pkey = "friend_pkey",
}

/**
 * update columns of table "friend"
 */
export enum friend_update_column {
  friendId = "friendId",
  original = "original",
  userId = "userId",
}

/**
 * unique or primary key constraints on table "groupChats"
 */
export enum groupChats_constraint {
  groupChats_pkey = "groupChats_pkey",
}

/**
 * update columns of table "groupChats"
 */
export enum groupChats_update_column {
  chatId = "chatId",
  groupId = "groupId",
}

/**
 * unique or primary key constraints on table "groupEvent"
 */
export enum groupEvent_constraint {
  groupEvent_pkey = "groupEvent_pkey",
}

/**
 * update columns of table "groupEvent"
 */
export enum groupEvent_update_column {
  eventId = "eventId",
  groupId = "groupId",
}

/**
 * unique or primary key constraints on table "groupInterest"
 */
export enum groupInterest_constraint {
  groupInterest_pkey = "groupInterest_pkey",
}

/**
 * update columns of table "groupInterest"
 */
export enum groupInterest_update_column {
  groupId = "groupId",
  interestId = "interestId",
}

/**
 * unique or primary key constraints on table "groupTrophy"
 */
export enum groupTrophy_constraint {
  groupTrophy_pkey = "groupTrophy_pkey",
}

/**
 * update columns of table "groupTrophy"
 */
export enum groupTrophy_update_column {
  groupId = "groupId",
  trophyId = "trophyId",
}

/**
 * unique or primary key constraints on table "group"
 */
export enum group_constraint {
  group_id_key = "group_id_key",
  group_pkey = "group_pkey",
}

/**
 * update columns of table "group"
 */
export enum group_update_column {
  description = "description",
  email = "email",
  gallery = "gallery",
  groupType = "groupType",
  id = "id",
  image = "image",
  links = "links",
  name = "name",
  phone = "phone",
  unsubscribable = "unsubscribable",
  website = "website",
}

/**
 * unique or primary key constraints on table "interest"
 */
export enum interest_constraint {
  interest_id_key = "interest_id_key",
  interests_pkey = "interests_pkey",
}

/**
 * update columns of table "interest"
 */
export enum interest_update_column {
  aliases = "aliases",
  id = "id",
  name = "name",
}

/**
 * unique or primary key constraints on table "like"
 */
export enum like_constraint {
  like_id_key = "like_id_key",
  like_pkey = "like_pkey",
}

/**
 * update columns of table "like"
 */
export enum like_update_column {
  id = "id",
  postId = "postId",
  userId = "userId",
}

/**
 * unique or primary key constraints on table "message"
 */
export enum message_constraint {
  message_pkey = "message_pkey",
}

/**
 * update columns of table "message"
 */
export enum message_update_column {
  body = "body",
  chatId = "chatId",
  date = "date",
  id = "id",
  senderId = "senderId",
}

/**
 * unique or primary key constraints on table "notification"
 */
export enum notification_constraint {
  notifications_pkey = "notifications_pkey",
}

/**
 * update columns of table "notification"
 */
export enum notification_update_column {
  id = "id",
  seen = "seen",
  timestamp = "timestamp",
  type = "type",
  typeId = "typeId",
}

/**
 * unique or primary key constraints on table "post"
 */
export enum post_constraint {
  post_id_key = "post_id_key",
  post_pkey = "post_pkey",
}

/**
 * update columns of table "post"
 */
export enum post_update_column {
  authorId = "authorId",
  groupId = "groupId",
  id = "id",
  images = "images",
  link = "link",
  text = "text",
  time = "time",
}

/**
 * unique or primary key constraints on table "program"
 */
export enum program_constraint {
  program_id_key = "program_id_key",
  program_name_key = "program_name_key",
  program_pkey = "program_pkey",
}

/**
 * update columns of table "program"
 */
export enum program_update_column {
  id = "id",
  name = "name",
}

/**
 * unique or primary key constraints on table "review"
 */
export enum review_constraint {
  review_id1_key = "review_id1_key",
  review_pkey = "review_pkey",
}

/**
 * update columns of table "review"
 */
export enum review_update_column {
  author = "author",
  comment = "comment",
  group = "group",
  id = "id",
  rating = "rating",
}

/**
 * unique or primary key constraints on table "trophy"
 */
export enum trophy_constraint {
  trophy_pkey = "trophy_pkey",
}

/**
 * update columns of table "trophy"
 */
export enum trophy_update_column {
  description = "description",
  id = "id",
  name = "name",
  score = "score",
}

/**
 * unique or primary key constraints on table "userChat"
 */
export enum userChat_constraint {
  userChat_pkey = "userChat_pkey",
}

/**
 * update columns of table "userChat"
 */
export enum userChat_update_column {
  chatId = "chatId",
  muted = "muted",
  seen = "seen",
  userId = "userId",
}

/**
 * unique or primary key constraints on table "userEvent"
 */
export enum userEvent_constraint {
  userEvent_pkey = "userEvent_pkey",
}

/**
 * update columns of table "userEvent"
 */
export enum userEvent_update_column {
  didAccept = "didAccept",
  eventId = "eventId",
  userId = "userId",
}

/**
 * unique or primary key constraints on table "userGroup"
 */
export enum userGroup_constraint {
  userMember_pkey = "userMember_pkey",
}

/**
 * update columns of table "userGroup"
 */
export enum userGroup_update_column {
  groupId = "groupId",
  isOwner = "isOwner",
  onCalendar = "onCalendar",
  userId = "userId",
}

/**
 * unique or primary key constraints on table "userInterest"
 */
export enum userInterest_constraint {
  userInterest_pkey = "userInterest_pkey",
}

/**
 * update columns of table "userInterest"
 */
export enum userInterest_update_column {
  interestId = "interestId",
  userId = "userId",
}

/**
 * unique or primary key constraints on table "userNotification"
 */
export enum userNotification_constraint {
  userNotification_pkey = "userNotification_pkey",
}

/**
 * update columns of table "userNotification"
 */
export enum userNotification_update_column {
  notificationId = "notificationId",
  userId = "userId",
}

/**
 * unique or primary key constraints on table "userProgram"
 */
export enum userProgram_constraint {
  userProgram_pkey = "userProgram_pkey",
}

/**
 * update columns of table "userProgram"
 */
export enum userProgram_update_column {
  programId = "programId",
  userId = "userId",
}

/**
 * unique or primary key constraints on table "user"
 */
export enum user_constraint {
  user_pkey = "user_pkey",
}

/**
 * update columns of table "user"
 */
export enum user_update_column {
  college = "college",
  description = "description",
  email = "email",
  id = "id",
  image = "image",
  isAdmin = "isAdmin",
  isLeader = "isLeader",
  links = "links",
  muteEvents = "muteEvents",
  muteGroups = "muteGroups",
  muteMessages = "muteMessages",
  muteUsers = "muteUsers",
  name = "name",
  notificationToken = "notificationToken",
  onlyFriendsCanMessage = "onlyFriendsCanMessage",
  timezone = "timezone",
  year = "year",
}

/**
 * expression to compare columns of type Boolean. All fields are combined with logical 'AND'.
 */
export interface Boolean_comparison_exp {
  _eq?: boolean | null;
  _gt?: boolean | null;
  _gte?: boolean | null;
  _in?: boolean[] | null;
  _is_null?: boolean | null;
  _lt?: boolean | null;
  _lte?: boolean | null;
  _neq?: boolean | null;
  _nin?: boolean[] | null;
}

/**
 * expression to compare columns of type Int. All fields are combined with logical 'AND'.
 */
export interface Int_comparison_exp {
  _eq?: number | null;
  _gt?: number | null;
  _gte?: number | null;
  _in?: number[] | null;
  _is_null?: boolean | null;
  _lt?: number | null;
  _lte?: number | null;
  _neq?: number | null;
  _nin?: number[] | null;
}

/**
 * expression to compare columns of type String. All fields are combined with logical 'AND'.
 */
export interface String_comparison_exp {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: string[] | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: string[] | null;
  _nlike?: string | null;
  _nsimilar?: string | null;
  _similar?: string | null;
}

/**
 * input type for inserting array relation for remote table "block"
 */
export interface block_arr_rel_insert_input {
  data: block_insert_input[];
  on_conflict?: block_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "block". All fields are combined with a logical 'AND'.
 */
export interface block_bool_exp {
  _and?: (block_bool_exp | null)[] | null;
  _not?: block_bool_exp | null;
  _or?: (block_bool_exp | null)[] | null;
  blockedId?: String_comparison_exp | null;
  blockerId?: String_comparison_exp | null;
  user?: user_bool_exp | null;
  userByBlockedid?: user_bool_exp | null;
}

/**
 * input type for inserting data into table "block"
 */
export interface block_insert_input {
  blockedId?: string | null;
  blockerId?: string | null;
  user?: user_obj_rel_insert_input | null;
  userByBlockedid?: user_obj_rel_insert_input | null;
}

/**
 * on conflict condition type for table "block"
 */
export interface block_on_conflict {
  constraint: block_constraint;
  update_columns: block_update_column[];
  where?: block_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "chatUserView". All fields are combined with a logical 'AND'.
 */
export interface chatUserView_bool_exp {
  _and?: (chatUserView_bool_exp | null)[] | null;
  _not?: chatUserView_bool_exp | null;
  _or?: (chatUserView_bool_exp | null)[] | null;
  chatId?: Int_comparison_exp | null;
  college?: String_comparison_exp | null;
  description?: String_comparison_exp | null;
  email?: String_comparison_exp | null;
  id?: String_comparison_exp | null;
  image?: String_comparison_exp | null;
  isOfficial?: Boolean_comparison_exp | null;
  links?: jsonb_comparison_exp | null;
  name?: String_comparison_exp | null;
  notificationToken?: String_comparison_exp | null;
  year?: Int_comparison_exp | null;
}

/**
 * Boolean expression to filter rows from the table "chat". All fields are combined with a logical 'AND'.
 */
export interface chat_bool_exp {
  _and?: (chat_bool_exp | null)[] | null;
  _not?: chat_bool_exp | null;
  _or?: (chat_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  image?: String_comparison_exp | null;
  messages?: message_bool_exp | null;
  name?: String_comparison_exp | null;
  participants?: chatUserView_bool_exp | null;
  unsubscribable?: Boolean_comparison_exp | null;
  users?: userChat_bool_exp | null;
}

/**
 * input type for inserting data into table "chat"
 */
export interface chat_insert_input {
  id?: number | null;
  image?: string | null;
  messages?: message_arr_rel_insert_input | null;
  name?: string | null;
  unsubscribable?: boolean | null;
  users?: userChat_arr_rel_insert_input | null;
}

/**
 * input type for inserting object relation for remote table "chat"
 */
export interface chat_obj_rel_insert_input {
  data: chat_insert_input;
  on_conflict?: chat_on_conflict | null;
}

/**
 * on conflict condition type for table "chat"
 */
export interface chat_on_conflict {
  constraint: chat_constraint;
  update_columns: chat_update_column[];
  where?: chat_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "comment"
 */
export interface comment_arr_rel_insert_input {
  data: comment_insert_input[];
  on_conflict?: comment_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "comment". All fields are combined with a logical 'AND'.
 */
export interface comment_bool_exp {
  _and?: (comment_bool_exp | null)[] | null;
  _not?: comment_bool_exp | null;
  _or?: (comment_bool_exp | null)[] | null;
  authorId?: String_comparison_exp | null;
  id?: Int_comparison_exp | null;
  post?: post_bool_exp | null;
  postId?: Int_comparison_exp | null;
  text?: String_comparison_exp | null;
  time?: timestamptz_comparison_exp | null;
  user?: user_bool_exp | null;
}

/**
 * input type for inserting data into table "comment"
 */
export interface comment_insert_input {
  authorId?: string | null;
  id?: number | null;
  post?: post_obj_rel_insert_input | null;
  postId?: number | null;
  text?: string | null;
  time?: any | null;
  user?: user_obj_rel_insert_input | null;
}

/**
 * on conflict condition type for table "comment"
 */
export interface comment_on_conflict {
  constraint: comment_constraint;
  update_columns: comment_update_column[];
  where?: comment_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "event". All fields are combined with a logical 'AND'.
 */
export interface event_bool_exp {
  _and?: (event_bool_exp | null)[] | null;
  _not?: event_bool_exp | null;
  _or?: (event_bool_exp | null)[] | null;
  attendees?: userEvent_bool_exp | null;
  description?: String_comparison_exp | null;
  email?: String_comparison_exp | null;
  endDate?: timestamptz_comparison_exp | null;
  eventType?: String_comparison_exp | null;
  gallery?: jsonb_comparison_exp | null;
  hosts?: groupEvent_bool_exp | null;
  id?: uuid_comparison_exp | null;
  image?: String_comparison_exp | null;
  isOfficial?: Boolean_comparison_exp | null;
  isZoom?: Boolean_comparison_exp | null;
  links?: jsonb_comparison_exp | null;
  location?: jsonb_comparison_exp | null;
  name?: String_comparison_exp | null;
  startDate?: timestamptz_comparison_exp | null;
  website?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "event"
 */
export interface event_insert_input {
  attendees?: userEvent_arr_rel_insert_input | null;
  description?: string | null;
  email?: string | null;
  endDate?: any | null;
  eventType?: string | null;
  gallery?: any | null;
  hosts?: groupEvent_arr_rel_insert_input | null;
  id?: any | null;
  image?: string | null;
  isOfficial?: boolean | null;
  isZoom?: boolean | null;
  links?: any | null;
  location?: any | null;
  name?: string | null;
  startDate?: any | null;
  website?: string | null;
}

/**
 * input type for inserting object relation for remote table "event"
 */
export interface event_obj_rel_insert_input {
  data: event_insert_input;
  on_conflict?: event_on_conflict | null;
}

/**
 * on conflict condition type for table "event"
 */
export interface event_on_conflict {
  constraint: event_constraint;
  update_columns: event_update_column[];
  where?: event_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "friendRequest"
 */
export interface friendRequest_arr_rel_insert_input {
  data: friendRequest_insert_input[];
  on_conflict?: friendRequest_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "friendRequest". All fields are combined with a logical 'AND'.
 */
export interface friendRequest_bool_exp {
  _and?: (friendRequest_bool_exp | null)[] | null;
  _not?: friendRequest_bool_exp | null;
  _or?: (friendRequest_bool_exp | null)[] | null;
  date?: timestamptz_comparison_exp | null;
  recipient?: String_comparison_exp | null;
  sender?: String_comparison_exp | null;
  user?: user_bool_exp | null;
  userByRecipient?: user_bool_exp | null;
}

/**
 * input type for inserting data into table "friendRequest"
 */
export interface friendRequest_insert_input {
  date?: any | null;
  recipient?: string | null;
  sender?: string | null;
  user?: user_obj_rel_insert_input | null;
  userByRecipient?: user_obj_rel_insert_input | null;
}

/**
 * on conflict condition type for table "friendRequest"
 */
export interface friendRequest_on_conflict {
  constraint: friendRequest_constraint;
  update_columns: friendRequest_update_column[];
  where?: friendRequest_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "friend"
 */
export interface friend_arr_rel_insert_input {
  data: friend_insert_input[];
  on_conflict?: friend_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "friend". All fields are combined with a logical 'AND'.
 */
export interface friend_bool_exp {
  _and?: (friend_bool_exp | null)[] | null;
  _not?: friend_bool_exp | null;
  _or?: (friend_bool_exp | null)[] | null;
  friend?: user_bool_exp | null;
  friendId?: String_comparison_exp | null;
  original?: Boolean_comparison_exp | null;
  user?: user_bool_exp | null;
  userId?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "friend"
 */
export interface friend_insert_input {
  friend?: user_obj_rel_insert_input | null;
  friendId?: string | null;
  original?: boolean | null;
  user?: user_obj_rel_insert_input | null;
  userId?: string | null;
}

/**
 * on conflict condition type for table "friend"
 */
export interface friend_on_conflict {
  constraint: friend_constraint;
  update_columns: friend_update_column[];
  where?: friend_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "groupChats"
 */
export interface groupChats_arr_rel_insert_input {
  data: groupChats_insert_input[];
  on_conflict?: groupChats_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "groupChats". All fields are combined with a logical 'AND'.
 */
export interface groupChats_bool_exp {
  _and?: (groupChats_bool_exp | null)[] | null;
  _not?: groupChats_bool_exp | null;
  _or?: (groupChats_bool_exp | null)[] | null;
  chat?: chat_bool_exp | null;
  chatId?: Int_comparison_exp | null;
  group?: group_bool_exp | null;
  groupId?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "groupChats"
 */
export interface groupChats_insert_input {
  chat?: chat_obj_rel_insert_input | null;
  chatId?: number | null;
  group?: group_obj_rel_insert_input | null;
  groupId?: any | null;
}

/**
 * on conflict condition type for table "groupChats"
 */
export interface groupChats_on_conflict {
  constraint: groupChats_constraint;
  update_columns: groupChats_update_column[];
  where?: groupChats_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "groupEvent"
 */
export interface groupEvent_arr_rel_insert_input {
  data: groupEvent_insert_input[];
  on_conflict?: groupEvent_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "groupEvent". All fields are combined with a logical 'AND'.
 */
export interface groupEvent_bool_exp {
  _and?: (groupEvent_bool_exp | null)[] | null;
  _not?: groupEvent_bool_exp | null;
  _or?: (groupEvent_bool_exp | null)[] | null;
  event?: event_bool_exp | null;
  eventId?: uuid_comparison_exp | null;
  group?: group_bool_exp | null;
  groupId?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "groupEvent"
 */
export interface groupEvent_insert_input {
  event?: event_obj_rel_insert_input | null;
  eventId?: any | null;
  group?: group_obj_rel_insert_input | null;
  groupId?: any | null;
}

/**
 * on conflict condition type for table "groupEvent"
 */
export interface groupEvent_on_conflict {
  constraint: groupEvent_constraint;
  update_columns: groupEvent_update_column[];
  where?: groupEvent_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "groupInterest"
 */
export interface groupInterest_arr_rel_insert_input {
  data: groupInterest_insert_input[];
  on_conflict?: groupInterest_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "groupInterest". All fields are combined with a logical 'AND'.
 */
export interface groupInterest_bool_exp {
  _and?: (groupInterest_bool_exp | null)[] | null;
  _not?: groupInterest_bool_exp | null;
  _or?: (groupInterest_bool_exp | null)[] | null;
  group?: group_bool_exp | null;
  groupId?: uuid_comparison_exp | null;
  interest?: interest_bool_exp | null;
  interestId?: Int_comparison_exp | null;
}

/**
 * input type for inserting data into table "groupInterest"
 */
export interface groupInterest_insert_input {
  group?: group_obj_rel_insert_input | null;
  groupId?: any | null;
  interest?: interest_obj_rel_insert_input | null;
  interestId?: number | null;
}

/**
 * on conflict condition type for table "groupInterest"
 */
export interface groupInterest_on_conflict {
  constraint: groupInterest_constraint;
  update_columns: groupInterest_update_column[];
  where?: groupInterest_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "groupTrophy"
 */
export interface groupTrophy_arr_rel_insert_input {
  data: groupTrophy_insert_input[];
  on_conflict?: groupTrophy_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "groupTrophy". All fields are combined with a logical 'AND'.
 */
export interface groupTrophy_bool_exp {
  _and?: (groupTrophy_bool_exp | null)[] | null;
  _not?: groupTrophy_bool_exp | null;
  _or?: (groupTrophy_bool_exp | null)[] | null;
  group?: group_bool_exp | null;
  groupId?: uuid_comparison_exp | null;
  trophy?: trophy_bool_exp | null;
  trophyId?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "groupTrophy"
 */
export interface groupTrophy_insert_input {
  group?: group_obj_rel_insert_input | null;
  groupId?: any | null;
  trophy?: trophy_obj_rel_insert_input | null;
  trophyId?: any | null;
}

/**
 * on conflict condition type for table "groupTrophy"
 */
export interface groupTrophy_on_conflict {
  constraint: groupTrophy_constraint;
  update_columns: groupTrophy_update_column[];
  where?: groupTrophy_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "group". All fields are combined with a logical 'AND'.
 */
export interface group_bool_exp {
  _and?: (group_bool_exp | null)[] | null;
  _not?: group_bool_exp | null;
  _or?: (group_bool_exp | null)[] | null;
  description?: String_comparison_exp | null;
  email?: String_comparison_exp | null;
  events?: groupEvent_bool_exp | null;
  gallery?: jsonb_comparison_exp | null;
  groupChats?: groupChats_bool_exp | null;
  groupTrophies?: groupTrophy_bool_exp | null;
  groupType?: String_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  image?: String_comparison_exp | null;
  links?: jsonb_comparison_exp | null;
  members?: userGroup_bool_exp | null;
  name?: String_comparison_exp | null;
  phone?: String_comparison_exp | null;
  posts?: post_bool_exp | null;
  reviews?: review_bool_exp | null;
  tags?: groupInterest_bool_exp | null;
  trophies?: trophyGroupView_bool_exp | null;
  unsubscribable?: Boolean_comparison_exp | null;
  website?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "group"
 */
export interface group_insert_input {
  description?: string | null;
  email?: string | null;
  events?: groupEvent_arr_rel_insert_input | null;
  gallery?: any | null;
  groupChats?: groupChats_arr_rel_insert_input | null;
  groupTrophies?: groupTrophy_arr_rel_insert_input | null;
  groupType?: string | null;
  id?: any | null;
  image?: string | null;
  links?: any | null;
  members?: userGroup_arr_rel_insert_input | null;
  name?: string | null;
  phone?: string | null;
  posts?: post_arr_rel_insert_input | null;
  reviews?: review_arr_rel_insert_input | null;
  tags?: groupInterest_arr_rel_insert_input | null;
  unsubscribable?: boolean | null;
  website?: string | null;
}

/**
 * input type for inserting object relation for remote table "group"
 */
export interface group_obj_rel_insert_input {
  data: group_insert_input;
  on_conflict?: group_on_conflict | null;
}

/**
 * on conflict condition type for table "group"
 */
export interface group_on_conflict {
  constraint: group_constraint;
  update_columns: group_update_column[];
  where?: group_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "interest". All fields are combined with a logical 'AND'.
 */
export interface interest_bool_exp {
  _and?: (interest_bool_exp | null)[] | null;
  _not?: interest_bool_exp | null;
  _or?: (interest_bool_exp | null)[] | null;
  aliases?: jsonb_comparison_exp | null;
  groupInterests?: groupInterest_bool_exp | null;
  id?: Int_comparison_exp | null;
  name?: String_comparison_exp | null;
  userInterests?: userInterest_bool_exp | null;
}

/**
 * input type for inserting data into table "interest"
 */
export interface interest_insert_input {
  aliases?: any | null;
  groupInterests?: groupInterest_arr_rel_insert_input | null;
  id?: number | null;
  name?: string | null;
  userInterests?: userInterest_arr_rel_insert_input | null;
}

/**
 * input type for inserting object relation for remote table "interest"
 */
export interface interest_obj_rel_insert_input {
  data: interest_insert_input;
  on_conflict?: interest_on_conflict | null;
}

/**
 * on conflict condition type for table "interest"
 */
export interface interest_on_conflict {
  constraint: interest_constraint;
  update_columns: interest_update_column[];
  where?: interest_bool_exp | null;
}

/**
 * expression to compare columns of type jsonb. All fields are combined with logical 'AND'.
 */
export interface jsonb_comparison_exp {
  _contained_in?: any | null;
  _contains?: any | null;
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _has_key?: string | null;
  _has_keys_all?: string[] | null;
  _has_keys_any?: string[] | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * input type for inserting array relation for remote table "like"
 */
export interface like_arr_rel_insert_input {
  data: like_insert_input[];
  on_conflict?: like_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "like". All fields are combined with a logical 'AND'.
 */
export interface like_bool_exp {
  _and?: (like_bool_exp | null)[] | null;
  _not?: like_bool_exp | null;
  _or?: (like_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  post?: post_bool_exp | null;
  postId?: Int_comparison_exp | null;
  user?: user_bool_exp | null;
  userId?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "like"
 */
export interface like_insert_input {
  id?: number | null;
  post?: post_obj_rel_insert_input | null;
  postId?: number | null;
  user?: user_obj_rel_insert_input | null;
  userId?: string | null;
}

/**
 * on conflict condition type for table "like"
 */
export interface like_on_conflict {
  constraint: like_constraint;
  update_columns: like_update_column[];
  where?: like_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "message"
 */
export interface message_arr_rel_insert_input {
  data: message_insert_input[];
  on_conflict?: message_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "message". All fields are combined with a logical 'AND'.
 */
export interface message_bool_exp {
  _and?: (message_bool_exp | null)[] | null;
  _not?: message_bool_exp | null;
  _or?: (message_bool_exp | null)[] | null;
  body?: String_comparison_exp | null;
  chat?: chat_bool_exp | null;
  chatId?: Int_comparison_exp | null;
  date?: timestamptz_comparison_exp | null;
  id?: Int_comparison_exp | null;
  sender?: user_bool_exp | null;
  senderId?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "message"
 */
export interface message_insert_input {
  body?: string | null;
  chat?: chat_obj_rel_insert_input | null;
  chatId?: number | null;
  date?: any | null;
  id?: number | null;
  sender?: user_obj_rel_insert_input | null;
  senderId?: string | null;
}

/**
 * on conflict condition type for table "message"
 */
export interface message_on_conflict {
  constraint: message_constraint;
  update_columns: message_update_column[];
  where?: message_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "notification". All fields are combined with a logical 'AND'.
 */
export interface notification_bool_exp {
  _and?: (notification_bool_exp | null)[] | null;
  _not?: notification_bool_exp | null;
  _or?: (notification_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  seen?: Boolean_comparison_exp | null;
  timestamp?: timestamptz_comparison_exp | null;
  type?: String_comparison_exp | null;
  typeId?: String_comparison_exp | null;
  userNotifications?: userNotification_bool_exp | null;
}

/**
 * input type for inserting data into table "notification"
 */
export interface notification_insert_input {
  id?: number | null;
  seen?: boolean | null;
  timestamp?: any | null;
  type?: string | null;
  typeId?: string | null;
  userNotifications?: userNotification_arr_rel_insert_input | null;
}

/**
 * input type for inserting object relation for remote table "notification"
 */
export interface notification_obj_rel_insert_input {
  data: notification_insert_input;
  on_conflict?: notification_on_conflict | null;
}

/**
 * on conflict condition type for table "notification"
 */
export interface notification_on_conflict {
  constraint: notification_constraint;
  update_columns: notification_update_column[];
  where?: notification_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "post"
 */
export interface post_arr_rel_insert_input {
  data: post_insert_input[];
  on_conflict?: post_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "post". All fields are combined with a logical 'AND'.
 */
export interface post_bool_exp {
  _and?: (post_bool_exp | null)[] | null;
  _not?: post_bool_exp | null;
  _or?: (post_bool_exp | null)[] | null;
  authorId?: String_comparison_exp | null;
  comments?: comment_bool_exp | null;
  group?: group_bool_exp | null;
  groupId?: uuid_comparison_exp | null;
  id?: Int_comparison_exp | null;
  images?: jsonb_comparison_exp | null;
  likes?: like_bool_exp | null;
  link?: String_comparison_exp | null;
  text?: String_comparison_exp | null;
  time?: timestamptz_comparison_exp | null;
  user?: user_bool_exp | null;
}

/**
 * input type for inserting data into table "post"
 */
export interface post_insert_input {
  authorId?: string | null;
  comments?: comment_arr_rel_insert_input | null;
  group?: group_obj_rel_insert_input | null;
  groupId?: any | null;
  id?: number | null;
  images?: any | null;
  likes?: like_arr_rel_insert_input | null;
  link?: string | null;
  text?: string | null;
  time?: any | null;
  user?: user_obj_rel_insert_input | null;
}

/**
 * input type for inserting object relation for remote table "post"
 */
export interface post_obj_rel_insert_input {
  data: post_insert_input;
  on_conflict?: post_on_conflict | null;
}

/**
 * on conflict condition type for table "post"
 */
export interface post_on_conflict {
  constraint: post_constraint;
  update_columns: post_update_column[];
  where?: post_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "program". All fields are combined with a logical 'AND'.
 */
export interface program_bool_exp {
  _and?: (program_bool_exp | null)[] | null;
  _not?: program_bool_exp | null;
  _or?: (program_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  name?: String_comparison_exp | null;
  users?: userProgram_bool_exp | null;
}

/**
 * input type for inserting data into table "program"
 */
export interface program_insert_input {
  id?: number | null;
  name?: string | null;
  users?: userProgram_arr_rel_insert_input | null;
}

/**
 * input type for inserting object relation for remote table "program"
 */
export interface program_obj_rel_insert_input {
  data: program_insert_input;
  on_conflict?: program_on_conflict | null;
}

/**
 * on conflict condition type for table "program"
 */
export interface program_on_conflict {
  constraint: program_constraint;
  update_columns: program_update_column[];
  where?: program_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "review"
 */
export interface review_arr_rel_insert_input {
  data: review_insert_input[];
  on_conflict?: review_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "review". All fields are combined with a logical 'AND'.
 */
export interface review_bool_exp {
  _and?: (review_bool_exp | null)[] | null;
  _not?: review_bool_exp | null;
  _or?: (review_bool_exp | null)[] | null;
  author?: String_comparison_exp | null;
  comment?: String_comparison_exp | null;
  group?: uuid_comparison_exp | null;
  groupByGroup?: group_bool_exp | null;
  id?: Int_comparison_exp | null;
  rating?: Int_comparison_exp | null;
  user?: user_bool_exp | null;
}

/**
 * input type for inserting data into table "review"
 */
export interface review_insert_input {
  author?: string | null;
  comment?: string | null;
  group?: any | null;
  groupByGroup?: group_obj_rel_insert_input | null;
  id?: number | null;
  rating?: number | null;
  user?: user_obj_rel_insert_input | null;
}

/**
 * on conflict condition type for table "review"
 */
export interface review_on_conflict {
  constraint: review_constraint;
  update_columns: review_update_column[];
  where?: review_bool_exp | null;
}

/**
 * expression to compare columns of type timestamptz. All fields are combined with logical 'AND'.
 */
export interface timestamptz_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * Boolean expression to filter rows from the table "trophyGroupView". All fields are combined with a logical 'AND'.
 */
export interface trophyGroupView_bool_exp {
  _and?: (trophyGroupView_bool_exp | null)[] | null;
  _not?: trophyGroupView_bool_exp | null;
  _or?: (trophyGroupView_bool_exp | null)[] | null;
  description?: String_comparison_exp | null;
  groupId?: uuid_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  name?: String_comparison_exp | null;
  score?: Int_comparison_exp | null;
}

/**
 * Boolean expression to filter rows from the table "trophy". All fields are combined with a logical 'AND'.
 */
export interface trophy_bool_exp {
  _and?: (trophy_bool_exp | null)[] | null;
  _not?: trophy_bool_exp | null;
  _or?: (trophy_bool_exp | null)[] | null;
  description?: String_comparison_exp | null;
  groupTrophies?: groupTrophy_bool_exp | null;
  id?: uuid_comparison_exp | null;
  name?: String_comparison_exp | null;
  score?: Int_comparison_exp | null;
}

/**
 * input type for inserting data into table "trophy"
 */
export interface trophy_insert_input {
  description?: string | null;
  groupTrophies?: groupTrophy_arr_rel_insert_input | null;
  id?: any | null;
  name?: string | null;
  score?: number | null;
}

/**
 * input type for inserting object relation for remote table "trophy"
 */
export interface trophy_obj_rel_insert_input {
  data: trophy_insert_input;
  on_conflict?: trophy_on_conflict | null;
}

/**
 * on conflict condition type for table "trophy"
 */
export interface trophy_on_conflict {
  constraint: trophy_constraint;
  update_columns: trophy_update_column[];
  where?: trophy_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "userChat"
 */
export interface userChat_arr_rel_insert_input {
  data: userChat_insert_input[];
  on_conflict?: userChat_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "userChat". All fields are combined with a logical 'AND'.
 */
export interface userChat_bool_exp {
  _and?: (userChat_bool_exp | null)[] | null;
  _not?: userChat_bool_exp | null;
  _or?: (userChat_bool_exp | null)[] | null;
  chat?: chat_bool_exp | null;
  chatId?: Int_comparison_exp | null;
  muted?: Boolean_comparison_exp | null;
  seen?: Boolean_comparison_exp | null;
  user?: user_bool_exp | null;
  userId?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "userChat"
 */
export interface userChat_insert_input {
  chat?: chat_obj_rel_insert_input | null;
  chatId?: number | null;
  muted?: boolean | null;
  seen?: boolean | null;
  user?: user_obj_rel_insert_input | null;
  userId?: string | null;
}

/**
 * on conflict condition type for table "userChat"
 */
export interface userChat_on_conflict {
  constraint: userChat_constraint;
  update_columns: userChat_update_column[];
  where?: userChat_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "userEvent"
 */
export interface userEvent_arr_rel_insert_input {
  data: userEvent_insert_input[];
  on_conflict?: userEvent_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "userEvent". All fields are combined with a logical 'AND'.
 */
export interface userEvent_bool_exp {
  _and?: (userEvent_bool_exp | null)[] | null;
  _not?: userEvent_bool_exp | null;
  _or?: (userEvent_bool_exp | null)[] | null;
  didAccept?: Boolean_comparison_exp | null;
  event?: event_bool_exp | null;
  eventId?: uuid_comparison_exp | null;
  user?: user_bool_exp | null;
  userId?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "userEvent"
 */
export interface userEvent_insert_input {
  didAccept?: boolean | null;
  event?: event_obj_rel_insert_input | null;
  eventId?: any | null;
  user?: user_obj_rel_insert_input | null;
  userId?: string | null;
}

/**
 * on conflict condition type for table "userEvent"
 */
export interface userEvent_on_conflict {
  constraint: userEvent_constraint;
  update_columns: userEvent_update_column[];
  where?: userEvent_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "userGroup"
 */
export interface userGroup_arr_rel_insert_input {
  data: userGroup_insert_input[];
  on_conflict?: userGroup_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "userGroup". All fields are combined with a logical 'AND'.
 */
export interface userGroup_bool_exp {
  _and?: (userGroup_bool_exp | null)[] | null;
  _not?: userGroup_bool_exp | null;
  _or?: (userGroup_bool_exp | null)[] | null;
  group?: group_bool_exp | null;
  groupId?: uuid_comparison_exp | null;
  isOwner?: Boolean_comparison_exp | null;
  onCalendar?: Boolean_comparison_exp | null;
  user?: user_bool_exp | null;
  userId?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "userGroup"
 */
export interface userGroup_insert_input {
  group?: group_obj_rel_insert_input | null;
  groupId?: any | null;
  isOwner?: boolean | null;
  onCalendar?: boolean | null;
  user?: user_obj_rel_insert_input | null;
  userId?: string | null;
}

/**
 * on conflict condition type for table "userGroup"
 */
export interface userGroup_on_conflict {
  constraint: userGroup_constraint;
  update_columns: userGroup_update_column[];
  where?: userGroup_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "userInterest"
 */
export interface userInterest_arr_rel_insert_input {
  data: userInterest_insert_input[];
  on_conflict?: userInterest_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "userInterest". All fields are combined with a logical 'AND'.
 */
export interface userInterest_bool_exp {
  _and?: (userInterest_bool_exp | null)[] | null;
  _not?: userInterest_bool_exp | null;
  _or?: (userInterest_bool_exp | null)[] | null;
  interest?: interest_bool_exp | null;
  interestId?: Int_comparison_exp | null;
  user?: user_bool_exp | null;
  userId?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "userInterest"
 */
export interface userInterest_insert_input {
  interest?: interest_obj_rel_insert_input | null;
  interestId?: number | null;
  user?: user_obj_rel_insert_input | null;
  userId?: string | null;
}

/**
 * on conflict condition type for table "userInterest"
 */
export interface userInterest_on_conflict {
  constraint: userInterest_constraint;
  update_columns: userInterest_update_column[];
  where?: userInterest_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "userNotificationView". All fields are combined with a logical 'AND'.
 */
export interface userNotificationView_bool_exp {
  _and?: (userNotificationView_bool_exp | null)[] | null;
  _not?: userNotificationView_bool_exp | null;
  _or?: (userNotificationView_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  seen?: Boolean_comparison_exp | null;
  timestamp?: timestamptz_comparison_exp | null;
  type?: String_comparison_exp | null;
  typeId?: String_comparison_exp | null;
  userId?: String_comparison_exp | null;
}

/**
 * input type for inserting array relation for remote table "userNotification"
 */
export interface userNotification_arr_rel_insert_input {
  data: userNotification_insert_input[];
  on_conflict?: userNotification_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "userNotification". All fields are combined with a logical 'AND'.
 */
export interface userNotification_bool_exp {
  _and?: (userNotification_bool_exp | null)[] | null;
  _not?: userNotification_bool_exp | null;
  _or?: (userNotification_bool_exp | null)[] | null;
  notification?: notification_bool_exp | null;
  notificationId?: Int_comparison_exp | null;
  user?: user_bool_exp | null;
  userId?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "userNotification"
 */
export interface userNotification_insert_input {
  notification?: notification_obj_rel_insert_input | null;
  notificationId?: number | null;
  user?: user_obj_rel_insert_input | null;
  userId?: string | null;
}

/**
 * on conflict condition type for table "userNotification"
 */
export interface userNotification_on_conflict {
  constraint: userNotification_constraint;
  update_columns: userNotification_update_column[];
  where?: userNotification_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "userProgram"
 */
export interface userProgram_arr_rel_insert_input {
  data: userProgram_insert_input[];
  on_conflict?: userProgram_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "userProgram". All fields are combined with a logical 'AND'.
 */
export interface userProgram_bool_exp {
  _and?: (userProgram_bool_exp | null)[] | null;
  _not?: userProgram_bool_exp | null;
  _or?: (userProgram_bool_exp | null)[] | null;
  program?: program_bool_exp | null;
  programId?: Int_comparison_exp | null;
  user?: user_bool_exp | null;
  userId?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "userProgram"
 */
export interface userProgram_insert_input {
  program?: program_obj_rel_insert_input | null;
  programId?: number | null;
  user?: user_obj_rel_insert_input | null;
  userId?: string | null;
}

/**
 * on conflict condition type for table "userProgram"
 */
export interface userProgram_on_conflict {
  constraint: userProgram_constraint;
  update_columns: userProgram_update_column[];
  where?: userProgram_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'.
 */
export interface user_bool_exp {
  _and?: (user_bool_exp | null)[] | null;
  _not?: user_bool_exp | null;
  _or?: (user_bool_exp | null)[] | null;
  blockedBy?: block_bool_exp | null;
  blocker?: block_bool_exp | null;
  college?: String_comparison_exp | null;
  description?: String_comparison_exp | null;
  email?: String_comparison_exp | null;
  events?: userEvent_bool_exp | null;
  friendRequestsReceived?: friendRequest_bool_exp | null;
  friendRequestsSent?: friendRequest_bool_exp | null;
  friends?: friend_bool_exp | null;
  friendsByFriendid?: friend_bool_exp | null;
  id?: String_comparison_exp | null;
  image?: String_comparison_exp | null;
  interests?: userInterest_bool_exp | null;
  isAdmin?: Boolean_comparison_exp | null;
  isLeader?: Boolean_comparison_exp | null;
  links?: jsonb_comparison_exp | null;
  member?: userGroup_bool_exp | null;
  messages?: message_bool_exp | null;
  muteEvents?: Boolean_comparison_exp | null;
  muteGroups?: Boolean_comparison_exp | null;
  muteMessages?: Boolean_comparison_exp | null;
  muteUsers?: Boolean_comparison_exp | null;
  name?: String_comparison_exp | null;
  notificationToken?: String_comparison_exp | null;
  notifications?: userNotificationView_bool_exp | null;
  onlyFriendsCanMessage?: Boolean_comparison_exp | null;
  programs?: userProgram_bool_exp | null;
  reviews?: review_bool_exp | null;
  timezone?: String_comparison_exp | null;
  userChats?: userChat_bool_exp | null;
  userNotifications?: userNotification_bool_exp | null;
  year?: Int_comparison_exp | null;
}

/**
 * input type for inserting data into table "user"
 */
export interface user_insert_input {
  blockedBy?: block_arr_rel_insert_input | null;
  blocker?: block_arr_rel_insert_input | null;
  college?: string | null;
  description?: string | null;
  email?: string | null;
  events?: userEvent_arr_rel_insert_input | null;
  friendRequestsReceived?: friendRequest_arr_rel_insert_input | null;
  friendRequestsSent?: friendRequest_arr_rel_insert_input | null;
  friends?: friend_arr_rel_insert_input | null;
  friendsByFriendid?: friend_arr_rel_insert_input | null;
  id?: string | null;
  image?: string | null;
  interests?: userInterest_arr_rel_insert_input | null;
  isAdmin?: boolean | null;
  isLeader?: boolean | null;
  links?: any | null;
  member?: userGroup_arr_rel_insert_input | null;
  messages?: message_arr_rel_insert_input | null;
  muteEvents?: boolean | null;
  muteGroups?: boolean | null;
  muteMessages?: boolean | null;
  muteUsers?: boolean | null;
  name?: string | null;
  notificationToken?: string | null;
  onlyFriendsCanMessage?: boolean | null;
  programs?: userProgram_arr_rel_insert_input | null;
  reviews?: review_arr_rel_insert_input | null;
  timezone?: string | null;
  userChats?: userChat_arr_rel_insert_input | null;
  userNotifications?: userNotification_arr_rel_insert_input | null;
  year?: number | null;
}

/**
 * input type for inserting object relation for remote table "user"
 */
export interface user_obj_rel_insert_input {
  data: user_insert_input;
  on_conflict?: user_on_conflict | null;
}

/**
 * on conflict condition type for table "user"
 */
export interface user_on_conflict {
  constraint: user_constraint;
  update_columns: user_update_column[];
  where?: user_bool_exp | null;
}

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

/**
 * expression to compare columns of type uuid. All fields are combined with logical 'AND'.
 */
export interface uuid_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
