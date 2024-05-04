import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:'https://frontend-test-api.aircall.dev/graphql',
  cache: new InMemoryCache(),
});

export default client;
