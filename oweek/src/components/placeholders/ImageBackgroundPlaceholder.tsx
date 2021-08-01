import React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderMedia, Shine } from 'rn-placeholder';
import getTheme from '@root/theme';

/**
 * Loading Placeholder for fetching data on Event and Group Screens
 */
const ImageBackgroundPlaceholder: React.FC = () => {
  const theme = getTheme();
  return (
    <View>
      <Placeholder Animation={(props) => <Shine {...props} reverse />}>
        <PlaceholderMedia size={900} color={theme.palette.placeholder} />
      </Placeholder>
    </View>
  );
};

export default ImageBackgroundPlaceholder;
