import { DocumentNode } from 'graphql'
import {
  useMutation as useApolloMutation,
  MutationHookOptions,
} from '@apollo/react-hooks'
import { RefetchQueriesFunction } from '@apollo/react-common'
import { PureQueryOptions, ApolloError } from 'apollo-client'
import { evolve, invoker, map, Evolvable, Evolver } from 'ramda'
import message from '../utils/message'

export type MutationOptions = {
  successMessage?: string
  onCompleted?: (response?: any) => any
  onError?: (error?: ApolloError) => any
  refetchQueries?: Array<string | PureQueryOptions> | RefetchQueriesFunction
  msg?: boolean
}

const transformations = evolve({
  dispatchdate: invoker(0, 'toISOString')(),
  scheduledate: invoker(0, 'toISOString')(),
  createdate: invoker(0, 'toISOString')(),
  deployDate: invoker(0, 'toISOString')(),
  deploydate: invoker(0, 'toISOString')(),
  distId: Number,
  distid: Number,
  elevation: Number,
  height: Number,
  isCharged: Boolean,
  isPost: Boolean,
  isReceipt: Boolean,
  loop: Number,
  quantity: Number,
  reportdate: invoker(0, 'toISOString')(),
  saledate: invoker(0, 'toISOString')(),
  scrappeddate: invoker(0, 'toISOString')(),
  villageId: Number,
  villageid: Number,
  width: Number,
  tbcontract: {
    starttime: invoker(0, 'toISOString')(),
    stoptime: invoker(0, 'toISOString')(),
    supervisor: Number,
  },
  tboutbound: {
    applydate: invoker(0, 'toISOString')(),
    outbounddate: invoker(0, 'toISOString')(),
    scheduleddate: invoker(0, 'toISOString')(),
  },
  tboutbounddetails: map(
    evolve({
      neededdate: invoker(0, 'toISOString')(),
    }),
  ),
})

export function useMutation<TValue>(
  query: DocumentNode,
  {
    notifyOnNetworkStatusChange = true,
    onCompleted,
    onError,
    successMessage,
    msg = true,
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
      if (msg) {
        message({
          content: successMessage || '資料已更新成功',
          type: 'success',
        })
      }
    },
    ...others,
  })

  const handler = (values: TValue) => {
    mutator({
      variables: { input: transformations(values as Evolvable<Evolver>) },
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
