import { ApolloClient, InMemoryCache } from '@apollo/client';

// My connection to backend db
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default client;
