import { DocumentNode } from 'graphql'
import {
  useMutation as useApolloMutation,
  MutationHookOptions,
} from '@apollo/react-hooks'
import { RefetchQueriesFunction } from '@apollo/react-common'
import { PureQueryOptions, ApolloError } from 'apollo-client'

export type MutationOptions = {
  successMessage?: string
  onCompleted?: (response?: any) => any
  onError?: (error?: ApolloError) => any
  refetchQueries?: Array<string | PureQueryOptions> | RefetchQueriesFunction
  showMsg?: boolean
}

export function useMutation<TValue>(
  query: DocumentNode,
  {
    notifyOnNetworkStatusChange = true,
    onCompleted,
    onError,
    successMessage,
    refetchQueries,
    ...others
  }: MutationHookOptions<any> & MutationOptions,
) {
  const [mutator, { loading, data, error }] = useApolloMutation(query, {
    notifyOnNetworkStatusChange,
    onError: (error: ApolloError) => {
      if (onError) {
        onError(error)
      }
    },
    onCompleted: data => {
      if (onCompleted) {
        onCompleted(data)
      }
    },
    ...others,
  })

  const handler = (values: TValue) => {
    mutator({
      variables: { input: values },
      refetchQueries,
    })
  }

  return {
    handler,
    loading,
    error,
    mutator,
    data,
  }
}

export default useMutation
