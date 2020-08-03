import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';
import { Theme } from '../../theme/Colours';
import EventCard from '../ReusableComponents/EventCard';
import { useSafeArea } from 'react-native-safe-area-context';

const { colours } = Theme.light;

/**
 * Loading Placeholder for fetching data on Schedule Screen
 * @returns {*}
 * @constructor
 */

const SchedulePlaceholder = () => {
  const insets = useSafeArea;
  return (
    <View>
      <Placeholder Animation={Shine}>
        <View style={{ paddingTop: 78, paddingLeft: 45 }}>
          <PlaceholderLine width={65} height={40} noMargin />
          <PlaceholderLine
            width={50}
            height={20}
            style={{ marginTop: 20 }}
            noMargin
          />
        </View>

        <View>
          <View style={styles.event}>
            <EventCard />
          </View>

          <View style={styles.eventPlaceholder}>
            <PlaceholderMedia size={55} color={colours.placeholder} isRound />

            <View style={styles.infoPlaceholder}>
              <PlaceholderLine
                width={75}
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
        </View>

        <View>
          <View style={styles.event2}>
            <EventCard />
          </View>

          <View style={styles.eventPlaceholder2}>
            <PlaceholderMedia size={55} color={colours.placeholder} isRound />

            <View style={styles.infoPlaceholder}>
              <PlaceholderLine
                width={75}
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
        </View>

        <View>
          <View style={styles.event2}>
            <EventCard />
          </View>

          <View style={styles.eventPlaceholder2}>
            <PlaceholderMedia size={55} color={colours.placeholder} isRound />

            <View style={styles.infoPlaceholder}>
              <PlaceholderLine
                width={75}
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
        </View>
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  event: {
    marginTop: 28,
    paddingLeft: 52,
  },
  event2: {
    paddingLeft: 52,
  },
  eventPlaceholder: {
    position: 'absolute',
    paddingTop: 62,
    paddingLeft: 65,
    flexDirection: 'row',
  },
  eventPlaceholder2: {
    position: 'absolute',
    paddingTop: 34,
    paddingLeft: 65,
    flexDirection: 'row',
  },
  infoPlaceholder: {
    flexDirection: 'column',
    width: 200,
  },
});

export default SchedulePlaceholder;
