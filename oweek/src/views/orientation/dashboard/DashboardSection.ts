import { getCurrentUser_user_member as Item } from '@graphql/types/getCurrentUser';

export default interface DashboardSection {
  title: string;
  data: Item[];
}
