import React from 'react';
import { View, Text, Button } from 'react-native';
import firebase from '@react-native-firebase/app';
import { AuthContext, ReloadContext } from '../../context';
import { Theme } from '../../theme/Colours';

const {colours} = Theme.light;

/**
 * A page for showing server errors.
 * @param e the error you would like to display
 * @constructor
 */
export default function Error({ e }) {
  const { setAuthState } = React.useContext(AuthContext);
  const {reload, setReload} = React.useContext(ReloadContext);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        backgroundColor: colours.base

      }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>
        Error
      </Text>
      <Text style={{ marginBottom: 5, width: '80%', textAlign: 'center' }}>
        There was a problem handling your request. If the issue persists, please contact support@arravon.com
      </Text>
      <Text style={{ color: '#808080', marginVertical: 10 }}>{e.message}</Text>
      <View style={{flexDirection: 'row', marginTop: 10, width: '80%', justifyContent: 'space-around'}}>
        <Button title={'Reload'} onPress={()=>setReload(!reload)} color={'green'} />

        <Button
          onPress={() => {
            try {
              setAuthState({ status: 'loading' });
              firebase
                .auth()
                .signOut()
                .then(setAuthState({ status: 'out' }));
            } catch (error) {
              console.log(error);
            }
          }}
          title={'Logout'}
        />
      </View>
    </View>
  );
}
