/* eslint camelcase: 0 */

export type DetailedUser = {
  id: string;
  name: string;
  description: string;
  programs: {
    programId: string;
    program: {
      id: string;
      name: string;
    };
  };
  image: string;
  year: number;
  onlyFriendsCanMessage: boolean;
  isLeader: boolean;
  isAdmin: boolean;
  member_aggregate: {
    aggregate: {
      count: number;
    };
  };
  friends_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

export type DetailedUserVars = {
  id: string;
};

export type CurrentUserData = {
  user: DetailedUser;
};
