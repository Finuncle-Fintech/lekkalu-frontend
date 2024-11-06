/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLClient } from 'graphql-request'
import { getCookie } from './cookie'
import { CSRF_TOKEN } from './constants'

export function getGraphQLClient(method: any) {
  const graphqlClient = new GraphQLClient(process.env.REACT_APP_GRAPHQL_URL as unknown as string, {
    headers: {
      Authorization: `JWT ${getCookie('access')}`,
      'Csrf-Token': getCookie(CSRF_TOKEN) || '',
      // Authorization:
      //   'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJoYXJhdGhrdW1hcmNob3dkYXJ5IiwiZXhwIjoxNzMyNTUxMzk0LCJvcmlnSWF0IjoxNzI5OTU5Mzk0fQ.z9K23sVvCm4sLkOu-nl-h9iODqh0ldRu5QMuQRVDMLM',
    },
    method,
    excludeOperationName: true,
  })
  return graphqlClient
}
