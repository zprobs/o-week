import React from 'react';
import { View, Text } from 'react-native';
import useStyles from './SectionHeader.styles';

interface Props {
  section: {
    title: string;
    data: any[];
  };
}

/**
 * render method for SectionList headers
 */
const SectionHeader: React.FC<Props> = ({ section: { title, data } }) => {
  const styles = useStyles();
  if (data.length === 0) return null;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.number}>{data.length}</Text>
      </View>
      <View style={{ width: 10 }} />
    </View>
  );
};

export default SectionHeader;
