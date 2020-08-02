import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';
import { Theme } from '../../theme/Colours';

const { colours } = Theme.light;

/**
 * Loading Placeholders for fetching data on Dashboard
 * @returns {*}
 * @constructor
 */

export const TitlePlaceholder = () => {
  return (
    <View>
      <Placeholder Animation={Shine}>
        <View style={styles.titlePlaceholder}>
          <PlaceholderLine
            width={85}
            height={30}
            color={colours.placeholder}
            noMargin
          />

          <PlaceholderLine
            width={60}
            height={15}
            color={colours.placeholder}
            noMargin
            style={{ marginTop: 20 }}
          />
        </View>
      </Placeholder>
    </View>
  );
};

export const SayHiPlaceholder = () => {
  return (
    <View>
      <Placeholder Animation={Shine}>
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

export const ListPlaceholder = () => {
  return (
    <View style={styles.listPlaceholder}>
      <Placeholder Animation={Shine}>
        <View>
          <View>
            <PlaceholderLine
              width={25}
              height={20}
              style={{ marginTop: 15, marginLeft: 25 }}
              color={colours.placeholder}
              noMargin
            />
          </View>

          <View>
            <PlaceholderLine
              color={colours.placeholder}
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

const styles = StyleSheet.create({
  titlePlaceholder: {
    marginTop: 35,
  },
  friendsPlaceholder: {
    flexDirection: 'row',
  },
  listPlaceholder: {
    paddingBottom: 187,
  },
  eventCardPlaceholder: {
    borderRadius: 30,
    marginTop: 35,
    marginHorizontal: 48,
  },
});
