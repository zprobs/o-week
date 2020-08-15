/**
 * The frontend application of 'Exploriti'. Built on React-Native, GraphQL for iOS and Android
 * https://github.com/exploriti
 * @author Zachary Probst, Shayan Shakeri, Salman Shahid, Paul Giurgeu, Usman Aymen and Antoine Finot
 * @copyright Arravon Technologies Inc.
 * @format
 * @flow strict-local
 */
import 'intl';
import 'intl/locale-data/jsonp/en';
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider, useMutation, useQuery } from '@apollo/react-hooks';
import Schedule from './components/Schedule';
import MyProfile from './components/MyProfile';
import Orientation from './components/Orientation';
import Settings from './components/Settings';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Landing from './components/Authentication';
import Loading from './components/Authentication/Loading';
import { AuthContext, ReloadContext, refreshToken } from './context';
import Error from './components/ReusableComponents/Error';
import { GET_CURRENT_USER, SET_TOKEN } from './graphql';
import Messages from './components/Messages';
import Notifications from './components/Notifications';
import AnimatedTabBar from '@gorhom/animated-tabbar';
import OrientationSVG from './assets/svg/OrientationSVG';
import MessagesSVG from './assets/svg/MessagesSVG';
import MyProfileSVG from './assets/svg/MyProfileSVG';
import { UIManager, Platform } from 'react-native';
import ScheduleSVG from './assets/svg/ScheduleSVG';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import {useNavigation} from '@react-navigation/native'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// console.disableYellowBox = true;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

async function saveTokenToDatabase(token) {
  // Assume user is already signed in
   const {authState} = useContext(AuthContext);
   const [setToken] = useMutation(SET_TOKEN);

   setToken({variables: {id: authState.user.uid, token: token}}).then(()=>console.log('saved', token));

}

const tabStyles = {
  labelStyle: {
    color: '#bf1330',
  },
  background: {
    activeColor: 'rgba(191, 19, 48, 0.35)',
    inactiveColor: 'rgba(191, 19, 48, 0)',
  },
};

const iconColor = {
  activeColor: '#bf1330',
  inactiveColor: 'rgba(0,0,0,1)',
};

const tabs = {
  Orientation: {
    icon: {
      component: OrientationSVG,
      ...iconColor,
    },
    ...tabStyles,
  },

  Schedule: {
    icon: {
      component: ScheduleSVG,
      ...iconColor,
    },
    ...tabStyles,
  },
  Messages: {
    icon: {
      component: MessagesSVG,
      ...iconColor,
    },
    ...tabStyles,
  },

  MyProfile: {
    icon: {
      component: MyProfileSVG,
      ...iconColor,
    },
    ...tabStyles,
  },
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Landing'} component={Landing} />
      <Stack.Screen name={'Signup'} component={Signup} />
      <Stack.Screen name={'Login'} component={Login} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  const { authState } = useContext(AuthContext);

  console.log('authState', authState);

  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { id: authState.user.uid },
  });

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token);
      });

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) return <Error e={error} />;

  if (data.user == null)
    return (
      <Error
        e={{ message: 'Account does not exist. Please create a new one' }}
      />
    );

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ gestureDirection: 'horizontal-inverted' }}
      />
    </Stack.Navigator>
  );
};

const HomeScreen = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      console.log('remote msg data', remoteMessage.data);
      //navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  if (loading) return  <Loading/>

  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar tabs={tabs} {...props} />}>
      <Tab.Screen name="Orientation" component={Orientation} />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="MyProfile" component={MyProfile} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [authState, setAuthState] = useState({ status: 'loading' });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          refreshToken(user, setAuthState);
      } else {
        setAuthState({ status: 'out' });
      }
    });
  }, []);

  const headers =
    authState.status === 'in'
      ? { Authorization: `Bearer ${authState.token}` }
      : {};

  const httpLink = new HttpLink({
    uri: 'https://exploriti-backend.herokuapp.com/v1/graphql',
    headers,
  });

  const wsLink = new WebSocketLink({
    uri: 'wss://exploriti-backend.herokuapp.com/v1alpha1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers,
      },
    },
  });


  const link = ApolloLink.from([
    onError((error) => {
      console.log('error code', error)
      console.log('graphQL Error', error.graphQLErrors)
      if (error.graphQLErrors && error.graphQLErrors[0].message && error.graphQLErrors[0].message.includes('JWT')) refreshToken(authState.user, setAuthState);
    }),
    split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    )
  ])

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <ReloadContext.Provider value={{ reload, setReload }}>
          <AuthContext.Provider value={{ authState, setAuthState }}>
            <NavigationContainer>
              {authState.status === 'loading' ? (
                <Loading />
              ) : authState.status === 'in' ? (
                <MainStack />
              ) : (
                <AuthStack />
              )}
              <FlashMessage position="top" />
            </NavigationContainer>
          </AuthContext.Provider>
        </ReloadContext.Provider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
