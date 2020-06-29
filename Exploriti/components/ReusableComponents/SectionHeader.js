import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';

const { colours } = Theme.light;
const { FontWeights, FontSizes } = Fonts;

/**
 * render method for SectionList headers
 * @param title
 * @param data
 * @returns {*}
 * @constructor
 */
const SectionHeader = ({ section: { title, data } }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.number}>{data.length}</Text>
      </View>
      <Text style={styles.seeAll}>See All</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colours.white,
    paddingHorizontal: 25,
  },
  title: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    color: colours.text03,
    marginRight: 15,
  },
  number: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    color: ThemeStatic.delete,
  },
  seeAll: {
    ...FontWeights.Bold,
    ...FontSizes.Caption,
    color: colours.text02,
  },
});

export default SectionHeader;
