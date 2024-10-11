import { GraphQLClient } from 'graphql-request'
import { getCookie } from './cookie'

export function getGraphQLClient(method: any) {
  const graphqlClient = new GraphQLClient(process.env.REACT_APP_GRAPHQL_URL as unknown as string, {
    headers: {
      Authorization: `Bearer ${getCookie('access')}`,
    },
    method,
    excludeOperationName: true,
  })
  return graphqlClient
}
