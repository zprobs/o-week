/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDetailedGroup
// ====================================================

export interface getDetailedGroup_group_members_user {
  __typename: "user";
  id: string;
  image: string;
  name: string;
}

export interface getDetailedGroup_group_members {
  __typename: "userGroup";
  /**
   * An object relationship
   */
  user: getDetailedGroup_group_members_user;
}

export interface getDetailedGroup_group_owners_user {
  __typename: "user";
  id: string;
  image: string;
  name: string;
}

export interface getDetailedGroup_group_owners {
  __typename: "userGroup";
  /**
   * An object relationship
   */
  user: getDetailedGroup_group_owners_user;
}

export interface getDetailedGroup_group_trophies {
  __typename: "trophyGroupView";
  id: any | null;
  name: string | null;
  score: number | null;
}

export interface getDetailedGroup_group_trophies_aggregate_aggregate_sum {
  __typename: "trophyGroupView_sum_fields";
  score: number | null;
}

export interface getDetailedGroup_group_trophies_aggregate_aggregate {
  __typename: "trophyGroupView_aggregate_fields";
  sum: getDetailedGroup_group_trophies_aggregate_aggregate_sum | null;
}

export interface getDetailedGroup_group_trophies_aggregate {
  __typename: "trophyGroupView_aggregate";
  aggregate: getDetailedGroup_group_trophies_aggregate_aggregate | null;
}

export interface getDetailedGroup_group_events_event {
  __typename: "event";
  id: any;
}

export interface getDetailedGroup_group_events {
  __typename: "groupEvent";
  /**
   * An object relationship
   */
  event: getDetailedGroup_group_events_event;
}

export interface getDetailedGroup_group_groupChats_chat_participants {
  __typename: "chatUserView";
  id: string | null;
  _id: string | null;
  name: string | null;
  image: string | null;
}

export interface getDetailedGroup_group_groupChats_chat_messagesAggregate_aggregate {
  __typename: "message_aggregate_fields";
  count: number | null;
}

export interface getDetailedGroup_group_groupChats_chat_messagesAggregate {
  __typename: "message_aggregate";
  aggregate: getDetailedGroup_group_groupChats_chat_messagesAggregate_aggregate | null;
}

export interface getDetailedGroup_group_groupChats_chat_messages_user {
  __typename: "user";
  id: string;
  _id: string;
  name: string;
  avatar: string;
}

export interface getDetailedGroup_group_groupChats_chat_messages {
  __typename: "message";
  id: number;
  _id: number;
  text: string;
  createdAt: any;
  /**
   * An object relationship
   */
  user: getDetailedGroup_group_groupChats_chat_messages_user;
}

export interface getDetailedGroup_group_groupChats_chat {
  __typename: "chat";
  id: number;
  _id: number;
  name: string | null;
  image: string | null;
  /**
   * An array relationship
   */
  participants: getDetailedGroup_group_groupChats_chat_participants[];
  /**
   * An aggregated array relationship
   */
  messagesAggregate: getDetailedGroup_group_groupChats_chat_messagesAggregate;
  /**
   * An array relationship
   */
  messages: getDetailedGroup_group_groupChats_chat_messages[];
}

export interface getDetailedGroup_group_groupChats {
  __typename: "groupChats";
  /**
   * An object relationship
   */
  chat: getDetailedGroup_group_groupChats_chat;
}

export interface getDetailedGroup_group_allChats {
  __typename: "groupChats";
  chatId: number;
}

export interface getDetailedGroup_group_posts_user {
  __typename: "user";
  id: string;
  name: string;
  image: string;
}

export interface getDetailedGroup_group_posts_comments_aggregate_aggregate {
  __typename: "comment_aggregate_fields";
  count: number | null;
}

export interface getDetailedGroup_group_posts_comments_aggregate {
  __typename: "comment_aggregate";
  aggregate: getDetailedGroup_group_posts_comments_aggregate_aggregate | null;
}

export interface getDetailedGroup_group_posts {
  __typename: "post";
  id: number;
  groupId: any;
  /**
   * An object relationship
   */
  user: getDetailedGroup_group_posts_user;
  time: any;
  /**
   * An aggregated array relationship
   */
  comments_aggregate: getDetailedGroup_group_posts_comments_aggregate;
  text: string;
  images: any | null;
  link: string | null;
}

export interface getDetailedGroup_group_posts_aggregate_aggregate {
  __typename: "post_aggregate_fields";
  count: number | null;
}

export interface getDetailedGroup_group_posts_aggregate {
  __typename: "post_aggregate";
  aggregate: getDetailedGroup_group_posts_aggregate_aggregate | null;
}

export interface getDetailedGroup_group {
  __typename: "group";
  id: any;
  name: string;
  image: string;
  description: string | null;
  /**
   * An array relationship
   */
  members: getDetailedGroup_group_members[];
  /**
   * An array relationship
   */
  owners: getDetailedGroup_group_owners[];
  /**
   * An array relationship
   */
  trophies: getDetailedGroup_group_trophies[];
  /**
   * An aggregated array relationship
   */
  trophies_aggregate: getDetailedGroup_group_trophies_aggregate;
  /**
   * An array relationship
   */
  events: getDetailedGroup_group_events[];
  unsubscribable: boolean;
  groupType: string;
  phone: string | null;
  /**
   * An array relationship
   */
  groupChats: getDetailedGroup_group_groupChats[];
  /**
   * An array relationship
   */
  allChats: getDetailedGroup_group_allChats[];
  /**
   * An array relationship
   */
  posts: getDetailedGroup_group_posts[];
  /**
   * An aggregated array relationship
   */
  posts_aggregate: getDetailedGroup_group_posts_aggregate;
}

export interface getDetailedGroup {
  /**
   * fetch data from the table: "group" using primary key columns
   */
  group: getDetailedGroup_group | null;
}

export interface getDetailedGroupVariables {
  id: any;
  currentUser: string;
}
