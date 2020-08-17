import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';
import { Theme } from '../../theme/Colours';

const { colours } = Theme.light;

/**
 * Loading Placeholder for fetching data on Event and Group Screens
 * @returns {*}
 * @constructor
 */
export const ImageBackgroundPlaceholder = () => {
  return (
    <View>
      <Placeholder Animation={Shine}>
        <PlaceholderMedia size={900} color={colours.placeholder} />
      </Placeholder>
    </View>
  );
};

