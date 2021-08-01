import React from 'react';
import { View } from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';
import getTheme from '@root/theme';
import useStyles from './DashboardPlaceholder.styles';

/**
 * Loading Placeholders for fetching data on Dashboard
 */

export const TitlePlaceholder: React.FC = () => {
  const styles = useStyles();
  const theme = getTheme();
  return (
    <View>
      <Placeholder Animation={(props) => <Shine {...props} reverse />}>
        <View style={styles.titlePlaceholder}>
          <PlaceholderLine
            width={85}
            height={30}
            color={theme.palette.placeholder}
            noMargin
          />

          <PlaceholderLine
            width={60}
            height={15}
            color={theme.palette.placeholder}
            noMargin
            style={{ marginTop: 20 }}
          />
        </View>
      </Placeholder>
    </View>
  );
};

export const SayHiPlaceholder: React.FC = () => {
  const styles = useStyles();
  return (
    <View>
      <Placeholder Animation={(props) => <Shine {...props} reverse />}>
        <View style={styles.friendsPlaceholder}>
          <PlaceholderMedia size={66} isRound style={{ marginLeft: 8 }} />
          <PlaceholderMedia
            size={66}
            isRound
            style={{ marginLeft: 16, marginTop: 16 }}
          />

          <PlaceholderMedia size={66} isRound style={{ marginLeft: 16 }} />

          <PlaceholderMedia
            size={66}
            isRound
            style={{ marginLeft: 16, marginTop: 16 }}
          />
        </View>
      </Placeholder>
    </View>
  );
};

export const ListPlaceholder: React.FC = () => {
  const styles = useStyles();
  const theme = getTheme();
  return (
    <View style={styles.listPlaceholder}>
      <Placeholder Animation={(props) => <Shine {...props} reverse />}>
        <View>
          <View>
            <PlaceholderLine
              width={25}
              height={20}
              style={{ marginTop: 15, marginLeft: 25 }}
              color={theme.palette.placeholder}
              noMargin
            />
          </View>

          <View>
            <PlaceholderLine
              color={theme.palette.placeholder}
              style={styles.eventCardPlaceholder}
              width={77}
              height={180}
              noMargin
            />
          </View>
        </View>
      </Placeholder>
    </View>
  );
};
