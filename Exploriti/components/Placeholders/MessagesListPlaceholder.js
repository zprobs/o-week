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
 * Loading Placeholder for fetching data on Messages Screen
 * @returns {*}
 * @constructor
 */

const MessagesListPlaceholder = () => {
  const MessagesCardPlaceholder = () => {
    return (
      <>
        <View style={styles.avatarPlaceholder}>
          <PlaceholderMedia color={colours.placeholder} size={55} isRound />
        </View>

        <View style={styles.infoPlaceholder}>
          <PlaceholderLine color={colours.placeholder} width={90} />
          <PlaceholderLine color={colours.placeholder} width={30} />
        </View>
      </>
    );
  };

  return (
    <View styles={styles.container}>
      <Placeholder Animation={Shine}>
        <MessagesCardPlaceholder />

        <MessagesCardPlaceholder />

        <MessagesCardPlaceholder />

        <MessagesCardPlaceholder />

        <MessagesCardPlaceholder />
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarPlaceholder: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  infoPlaceholder: {
    paddingTop: 5,
    paddingLeft: 80,
  },
});
export default MessagesListPlaceholder;
