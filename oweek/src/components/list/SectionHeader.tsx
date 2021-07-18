import React from 'react';
import { View, Text, SectionListData } from 'react-native';
import { getCurrentUser_user_member as Item } from '@graphql/types/getCurrentUser';
import DashboardSection from '@views/orientation/dashboard/DashboardSection';
import useStyles from './SectionHeader.styles';

interface Props {
  section: SectionListData<Item, DashboardSection>;
}

/**
 * render method for SectionList headers
 */
const SectionHeader: React.FC<Props> = ({ section }) => {
  const { data, title } = section;
  const styles = useStyles();
  if (data.length === 0) return null;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.number}>{data.length}</Text>
      </View>
      <View style={styles.width} />
    </View>
  );
};

export default SectionHeader;
