import React from 'react';
import { View, Text, Button } from 'react-native';
import firebase from '@react-native-firebase/app';
import { AuthContext } from '../../context';

/**
 * A page for showing server errors.
 * @param e the error you would like to display
 * @constructor
 */
export default function Error({ e }) {
  const { setAuthState } = React.useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
      }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>
        Error
      </Text>
      <Text style={{ marginBottom: 5 }}>
        We are unable to connect to the server at this time. Apologies for the
        inconvenience
      </Text>
      <Text style={{ color: '#808080' }}>{e.message}</Text>
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
  );
}
