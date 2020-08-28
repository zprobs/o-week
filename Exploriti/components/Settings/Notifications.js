import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SettingsSwitch from '../ReusableComponents/SettingsSwitch';
import { Theme, ThemeStatic } from '../../theme/Colours';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_NOTIFICATION_SETTINGS, UPDATE_USER } from '../../graphql';
import { AuthContext, processError, processWarning } from '../../context';
import ButtonColour from '../ReusableComponents/ButtonColour';

const { colours } = Theme.light;

/**
 * Notification Settings. used to update what triggers a push notification
 * @returns {JSX.Element|null}
 * @constructor
 */
function Notifications() {
  const { authState } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_NOTIFICATION_SETTINGS, {
    variables: { id: authState.user.uid },
    fetchPolicy: 'cache-and-network',
  });
  const [updateUser, { error: updateError }] = useMutation(UPDATE_USER);

  const [muteMessages, setMuteMessages] = useState();
  const [muteEvents, setMuteEvents] = useState();
  const [muteGroups, setMuteGroups] = useState();
  const [muteAll, setMuteAll] = useState();
  const [isUploading, setIsUploading] = useState(false);

  console.log('muteMsg', muteMessages);

  useEffect(() => {
    if (!data) return;
    const { user } = data;
    setMuteMessages(user.muteMessages);
    setMuteEvents(user.muteEvents);
    setMuteGroups(user.muteGroups);
    setMuteAll(user.muteMessages && user.muteEvents && user.muteGroups);
  }, [data]);

  const onSave = () => {
    if (data) {
      setIsUploading(true);
      const { user } = data;
      if (
        muteMessages !== user.muteMessages ||
        muteEvents !== user.muteEvents ||
        muteGroups !== user.muteGroups
      ) {
        console.log('mutation');
        const fields = {};
        fields.muteMessages = muteMessages;
        fields.muteEvents = muteEvents;
        fields.muteGroups = muteGroups;
        console.log('fields', fields);

        updateUser({
          variables: { user: { id: authState.user.uid }, data: fields },
        }).then(setIsUploading(false));
      }
    }
  };

  if (error) processWarning(error, 'Network Error');
  if (updateError) processError(updateError, 'Could not update settings');
  if (loading || error) return null;

  const onMuteAll = (bool) => {
    console.log('bool', bool);
    setMuteAll(bool);
    setMuteEvents(bool);
    setMuteGroups(bool);
    setMuteMessages(bool);
  };

  return (
    <View style={styles.container}>
      <SettingsSwitch
        title="Mute Messages"
        setIsEnabled={setMuteMessages}
        isEnabled={muteMessages}
      />
      <SettingsSwitch
        title="Mute Events"
        setIsEnabled={setMuteEvents}
        isEnabled={muteEvents}
      />
      <SettingsSwitch
        title="Mute Group Notifications"
        isEnabled={muteGroups}
        setIsEnabled={setMuteGroups}
      />
      <SettingsSwitch
        title="Mute All"
        setIsEnabled={onMuteAll}
        isEnabled={muteAll}
      />

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.base,
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 20,
  },
});

export default Notifications;
