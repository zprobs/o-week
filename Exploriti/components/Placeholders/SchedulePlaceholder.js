import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';
import { Theme } from '../../theme/Colours';
import EventCard from '../ReusableComponents/EventCard';

const { colours } = Theme.light;

/**
 * Loading Placeholder for fetching data on Schedule Screen
 * @returns {*}
 * @constructor
 */

const SchedulePlaceholder = () => {
  return (
    <View>
      <Placeholder Animation={Shine}>
        <View style={styles.event}>
          <EventCard />
        </View>

        <View style={styles.eventPlaceholder}>
          <PlaceholderMedia size={55} color={colours.placeholder} isRound />

          <View style={styles.infoPlaceholder}>
            <PlaceholderLine
              width={65}
              height={15}
              color={colours.placeholder}
              style={{
                marginLeft: 10,
                marginTop: 10,
              }}
            />
            <PlaceholderLine
              width={50}
              height={10}
              color={colours.placeholder}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  event: {
    marginTop: 30,
    paddingLeft: 52,
  },
  eventPlaceholder: {
    position: 'absolute',
    paddingTop: 62,
    paddingLeft: 65,
    flexDirection: 'row',
  },
  infoPlaceholder: {
    flexDirection: 'column',
    width: 200,
  },
});

export default SchedulePlaceholder;
