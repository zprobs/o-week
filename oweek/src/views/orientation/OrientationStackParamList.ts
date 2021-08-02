export type OrientationStackParamList = {
  Orientation: undefined;
  GroupScreen: { groupId: string };
  PostScreen: { postId: number; authorId?: string; comment: boolean };
  Gallery: { images: string[] };
  AllPosts: undefined;
  CreatePost: undefined;
};
