import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Theme, ThemeStatic } from '../../theme/Colours';
import SegmentedControl from '@react-native-community/segmented-control';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_MESSAGE_SETTINGS, UPDATE_USER } from '../../graphql';
import { AuthContext, processError, processWarning } from '../../context';

const { FontWeights, FontSizes } = Fonts;
const { colours } = Theme.light;

const messagesDescription = [
  "You will be able to receive messages from anyone on The app, except for people you've blocked",
  "Only people who you're friends with will be able to send you messages",
];

/**
 * componenet to change message privacy settings. Settings  -> Message Privacy
 * @returns {JSX.Element|null}
 * @constructor
 */
function MessagePrivacy() {
  const { authState } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_MESSAGE_SETTINGS, {
    variables: { id: authState.user.uid },
    fetchPolicy: 'cache-and-network',
  });

  const [messagesIndex, setMessagesIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [updateUser, { error: updateError }] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (!data) return;
    if (data.user.onlyFriendsCanMessage) {
      setMessagesIndex(1);
    } else {
      setMessagesIndex(0);
    }
  }, [data]);

  if (error) processWarning(error, 'Network Error');
  if (updateError) processError(updateError, 'Could not update settings');
  if (loading || error) return null;

  const onSave = () => {
    if (data) {
      setIsUploading(true);
      const fields = {
        onlyFriendsCanMessage: messagesIndex === 1,
      };
      console.log('fields', fields);

      updateUser({
        variables: { user: { id: authState.user.uid }, data: fields },
      }).then(setIsUploading(false));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.headerText}>Who Can Send You Messages?</Text>

        <SegmentedControl
          values={['Anyone', 'Friends']}
          selectedIndex={messagesIndex}
          onChange={(event) => {
            setMessagesIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          style={styles.selector}
        />

        <Text style={styles.descriptionText}>
          {messagesDescription[messagesIndex]}
        </Text>
      </View>

      <View style={styles.section}>
        <ButtonColour
          label="Save"
          title="done"
          onPress={onSave}
          loading={isUploading}
          containerStyle={styles.button}
          colour={ThemeStatic.accent}
          light={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
  },
  section: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    marginVertical: 15,
  },
  headerText: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
    paddingLeft: 20,
    marginVertical: 12,
  },
  titleText: {
    ...FontSizes.Caption,
    ...FontWeights.Regular,
    paddingLeft: 20,
  },
  descriptionText: {
    ...FontSizes.Body,
    ...FontWeights.Regular,
    marginVertical: 10,
  },
});

export default MessagePrivacy;
