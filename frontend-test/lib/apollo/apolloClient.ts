import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an http link
const httpLink = createHttpLink({
  uri: 'https://frontend-test-api.aircall.dev/graphql',
});

// Create a middleware to add headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const accessToken = localStorage.getItem('accessToken');

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
