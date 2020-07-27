import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Placeholder, PlaceholderLine, PlaceholderMedia, Shine } from 'rn-placeholder';
import { Theme } from '../../theme/Colours';

const {colours} = Theme.light

/**
 * Loading Placeholder for fetching data on Profile Screen
 * @param hasInteractions {boolean} if true, will render placeholder for message and add friend buttons
 * @returns {*}
 * @constructor
 */
const ProfileScreenPlaceholder = ({ hasInteractions }) => {

  return (
    <View style={styles.container}>
      <Placeholder Animation={Shine}>
        <View style={styles.avatarPlaceholder}>
          <PlaceholderLine
            noMargin
            color={colours.placeholder}
            style={styles.connectionsPlaceholder}
            width={20}
            height={48}
          />
          <PlaceholderMedia color={colours.placeholder} size={120} isRound />
          <PlaceholderLine
            noMargin
            color={colours.placeholder}
            style={styles.connectionsPlaceholder}
            width={20}
            height={48}
          />
        </View>

        <View style={styles.infoPlaceholder}>
          <PlaceholderLine
            noMargin
            color={colours.placeholder}
            style={styles.namePlaceholder}
            width={70}
            height={20}
          />
          <PlaceholderLine
            noMargin
            color={colours.placeholder}
            style={styles.handlePlaceholder}
            width={50}
            height={16}
          />
          {hasInteractions &&
          <View style={styles.interact}>
            <PlaceholderLine
              noMargin
              color={colours.placeholder}
              style={styles.interaction}
              width={48}
              height={32}
            />
            <PlaceholderLine
              noMargin
              color={colours.placeholder}
              style={styles.interaction}
              width={48}
              height={32}
            />
          </View>}
          <PlaceholderLine
            noMargin
            color={colours.placeholder}
            style={styles.aboutPlaceholder}
            width={100}
            height={110}
          />
        </View>
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 4,
    paddingHorizontal: 15,
  },
  avatarPlaceholder: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  connectionsPlaceholder: {
    borderRadius: 10,
    marginHorizontal: 18
  },
  infoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  namePlaceholder: {
    borderRadius: 10
  },
  handlePlaceholder: {
    marginTop: 10,
    borderRadius: 10
  },
  interact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  interaction: {
    borderRadius: 50
  },
  aboutPlaceholder: {
    marginTop: 16,
    marginBottom: 4,
    borderRadius: 10
  },
});

export default ProfileScreenPlaceholder;
