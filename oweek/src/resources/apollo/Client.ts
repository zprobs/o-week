import { ApolloClient, ApolloLink, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
// eslint-disable-next-line import/no-unresolved
import { DEV_TOKEN } from '@env';
import { getMainDefinition } from '@apollo/client/utilities';
import Cache from './Cache';

const httpLink = new HttpLink({
  uri: 'http://143.110.208.133/v1/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://143.110.208.133/v1alpha1/graphql',
  options: {
    reconnect: true,
    connectionParams: async () => {
      console.log(`web socket fetching token${DEV_TOKEN}`);
      return {
        headers: {
          Authorization: `Bearer ${DEV_TOKEN}`,
        },
      };
    },
  },
});

const authLink = setContext((_, { headers }) => {
  console.log(`authLink fetching token${DEV_TOKEN}`);
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${DEV_TOKEN}`,
    },
  };
});

const link = ApolloLink.from([
  authLink,
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  ),
]);

const client = new ApolloClient({
  link,
  cache: Cache,
});

export default client;
