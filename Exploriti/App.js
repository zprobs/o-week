/**
 * The frontend application of 'Exploriti'. Built on React-Native, GraphQL, and Django for iOS and Android
 * https://github.com/exploriti
 * @author Zachary Probst, Shayan Shakeri, Salman Shahid, Paul Giugeu, and Antoine Finot
 * @copyright Arravon Technologies Inc.
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import React, {useState, useEffect, useContext, useMemo, useReducer, useCallback, useRef} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import {ApolloProvider, useApolloClient, useMutation, useQuery} from '@apollo/react-hooks';
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
import { UserContext, AuthContext, userReducer } from './context';
import Icon from "react-native-vector-icons/EvilIcons";
import Error from './components/ReusableComponents/Error';
import {GET_CURRENT_USER, UPDATE_USER} from './graphql';
import Messages from './components/Messages';
import Notifications from './components/Notifications';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => {

    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={"Landing"} component={Landing}/>
          <Stack.Screen name={"Signup"} component={Signup}/>
          <Stack.Screen name={"Login"} component={Login}/>
      </Stack.Navigator>
    );
};

const MainStack = () => {

    const {authState} = useContext(AuthContext);
    const userId = authState.user.uid;

    const { loading, error, data } = useQuery(GET_CURRENT_USER, {
        variables: { id: userId },
    });

    if (loading) {
        return <Loading/>;
    }
    if (error) return <Error e={error} />;

    if (data.user == null) return <Error e={{ message: "Account does not exist. Please create a new one"}}/>;


    console.log('MainData');
    console.log(data)


    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Settings" component={Settings} options={{gestureDirection: 'horizontal-inverted'}}/>
            <Stack.Screen name="Messages" component={Messages} />
        </Stack.Navigator>
    );
};

const HomeScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Orientation"
                component={Orientation}
                options={{
                    tabBarLabel: "Orientation",
                    tabBarIcon: ({ color}) => (
                        <Icon name="star" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Explore"
                component={Explore}
                options={{
                    tabBarLabel: "Explore",
                    tabBarIcon: ({ color}) => (
                        <Icon name="search" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarLabel: "Notifications",
                    tabBarIcon: ({ color}) => (
                        <Icon name="bell" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="MyProfile"
                component={MyProfile}
                options={{
                    tabBarLabel: "MyProfile",
                    tabBarIcon: ({ color}) => (
                        <Icon name="user" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default function App () {
    const [authState, setAuthState] = useState({ status: "loading" });

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                return user.getIdToken().then((token) => firebase.auth().currentUser.getIdTokenResult()
                    .then((result) => {
                        if (result.claims['https://hasura.io/jwt/claims']) {
                           setAuthState({ status: "in", user, token });
                           return token;
                        }
                        const endpoint = 'https://us-central1-exploriti-rotman.cloudfunctions.net/refreshToken';
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
