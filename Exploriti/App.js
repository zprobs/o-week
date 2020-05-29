/**
 * The frontend application of 'Exploriti'. Built on React-Native, GraphQL, and Django for iOS and Android
 * https://github.com/exploriti
 * @author Zachary Probst, Shayan Shakeri, Salman Shahid, Paul Giugeu, and Antoine Finot
 * @copyright Arravon Technologies Inc.
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import React, {useState, useEffect, useContext, useMemo} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import Explore from "./components/Explore";
import MyProfile from "./components/MyProfile";
import Orientation from "./components/Orientation";
import Settings from "./components/Settings";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Landing from './components/Authentication';
import Loading from './components/Authentication/Loading';
import { UserContext, AuthContext } from './context';
import Icon from "react-native-vector-icons/EvilIcons";
import Error from './components/ReusableComponents/Error';
import { GET_USER } from './graphql';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  // Create const on a separate line to pass in Drawer Navigation and avoid warning

    console.log('homeScreen Start');
  const SettingsComponent = () => (
    <Settings toggleDrawer={navigation.toggleDrawer} />
  );

  const ExploreComponent = () => (
    <Explore toggleDrawer={navigation.toggleDrawer} />
  );

  const OrientationComponent = () => (
    <Orientation toggleDrawer={navigation.toggleDrawer} />
  );

  const MyProfileComponent = () => (
    <MyProfile toggleDrawer={navigation.toggleDrawer} />
  );

  return (
    <Tab.Navigator>
      <Tab.Screen name="Orientation" component={OrientationComponent}
      options={{
          tabBarLabel: 'Orientation',
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" color={color} size={30} />
          ),
        }}
        />
      <Tab.Screen name="Explore" component={ExploreComponent}
      options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Icon name="sc-telegram" color={color} size={30} />
          ),
        }}
        />
      <Tab.Screen name="MyProfile" component={MyProfileComponent}
      options={{
          tabBarLabel: 'MyProfile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
        />
      <Tab.Screen name="Settings" component={SettingsComponent}
      options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="gear" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {

    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={"Landing"} component={Landing}/>
          <Stack.Screen name={"Signup"} component={Signup}/>
          <Stack.Screen name={"Login"} component={Login}/>
      </Stack.Navigator>
    );
}

function MainStack() {


    console.log('main stack start');

    const {authState} = useContext(AuthContext);

    const userId = authState.user.uid;
    console.log('UID: ');
    console.log(userId);

    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id: userId },
    });

    if (loading) return <Loading/>;
    if (error) return <Error e={error} />;

    if (data.user == null) return <Error e={{ message: "Account does not exist. Please create a new one"}}/>

    console.log(data);
    console.log('main stack return');
    return (
            <MainApp data={data}/>
    );

}

function MainApp({data}) {
    const [user, setUser] = useState(
        {
            name: data.user.name,
            description: data.user.description,
            image: "https://reactjs.org/logo-og.png",
            program: data.user.programs.map(i => i.program.name).join(", ")
        }
    );
   // const userProviderValue = useMemo(() => ({user, setUser}), [user, setUser]);


    console.log('data received');
    return (
        <UserContext.Provider value={{user, setUser}}>
        <Drawer.Navigator initialRouteName="Home" edgeWidth={0}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Admin" component={HomeScreen} />
            <Drawer.Screen name="Settings" component={HomeScreen} />
            <Drawer.Screen name="About" component={HomeScreen} />
            <Drawer.Screen name="Logout" component={logout} />
        </Drawer.Navigator>
        </UserContext.Provider>
    );
}

function logout() {
    processLogout();
    return (<Loading/>);
}

// salman.shahid@jectoronto.org zachattack

const processLogout = async () => {
    const {authState, setAuthState} = useContext(AuthContext);
    try {
        setAuthState({ status: "loading" });
        await firebase.auth().signOut();
        setAuthState({ status: "out" });
    } catch (error) {
        console.log(error);
    }
};

export default function App () {
    const [authState, setAuthState] = React.useState({ status: "loading" });

    useEffect(() => {
        return firebase.auth().onAuthStateChanged((user) => {
            console.log('checking user');
            if (user) {
                return user.getIdToken().then((token) => firebase.auth().currentUser.getIdTokenResult()
                    .then((result) => {
                        if (result.claims['https://hasura.io/jwt/claims']) {
                           // setAuthState({ status: "in", user, token });
                        }
                        const endpoint = 'https://us-central1-exploriti-rotman.cloudfunctions.net/refreshToken'
                        return fetch(`${endpoint}?uid=${user.uid}`).then((res) => {
                            if (res.status === 200) {
                                return user.getIdToken(true)
                            }
                            return res.json().then((e) => { throw e })
                        })
                    })).then((token) => {
                    setAuthState({ status: "in", user, token });
                }).catch(console.error)
            } else {
                setAuthState({ status: "out" });
            }
        })
    }, []);

    const headers = authState.status === "in" ? { Authorization: `Bearer ${authState.token}` } : {};

    const httpLink = new HttpLink({
        uri: "https://exploriti-backend.herokuapp.com/v1/graphql",
        headers
    });

    const wsLink = new WebSocketLink({
        uri: "wss://exploriti-backend.herokuapp.com/v1alpha1/graphql",
        options: {
            reconnect: true,
            connectionParams: {
                headers
            }
        }
    });

    const link = split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httpLink
    );

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache()
    });



    return (
        <ApolloProvider client={client}>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <NavigationContainer>
                    { authState.status === "loading" ? (
                        <Loading/>
                    ) : authState.status === "in" ? (
                        <MainStack/>
                    ) : (
                        <AuthStack/>
                    )}
                </NavigationContainer>
            </AuthContext.Provider>
        </ApolloProvider>
    );
};
