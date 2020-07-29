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
 * Loading Placeholder for fetching data on Notifications Screen
 * @returns {*}
 * @constructor
 */

const NotificationsPlaceholder = () => {
  const NotificationsCard = () => {
    return (
      <View style={styles.cardPlaceholder}>
        <View style={styles.imagePlaceholder}>
          <PlaceholderMedia size={40} color={colours.placeholder} isRound />
        </View>
        <View style={styles.infoPlaceholder}>
          <PlaceholderLine width={90} style={styles.line} />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Placeholder Animation={Shine}>
        <NotificationsCard />
        <NotificationsCard />
        <NotificationsCard />
        <NotificationsCard />
        <NotificationsCard />
      </Placeholder>
    </View>
  );
};

export default NotificationsPlaceholder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 100,
  },
  cardPlaceholder: {
    marginVertical: 10,
  },
  imagePlaceholder: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 20,
    justifyContent: 'center',

    // paddingVertical: ,
  },
  infoPlaceholder: {
    flex: 1,
    paddingLeft: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
