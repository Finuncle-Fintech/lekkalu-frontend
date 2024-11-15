import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getCookie } from '@/utils/cookie'

// Create an HTTP link to the GraphQL endpoint
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL + 'graphql',
})

// Use setContext to modify the request headers
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `JWT ${getCookie('access')}`,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
export default client
