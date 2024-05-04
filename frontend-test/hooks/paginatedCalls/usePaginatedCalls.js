import { useEffect, useState } from 'react'
import paginatedCallsQuery from './paginatedCalls.gql'
import { useQuery } from '@apollo/client'

export default function usePaginatedCalls(limit,offset) {
    const authToken = localStorage.getItem('accessToken')

    const { loading, data, refetch } = useQuery(paginatedCallsQuery, {
        variables: { offset: offset, limit: limit },
    })
    const paginatedCallsData = data?.paginatedCalls
    const count = data?.paginatedCalls?.totalCount
    const hasNextPage = data?.paginatedCalls?.hasNextPage

    useEffect(() => {
        console.log('paginatedCallsData ', paginatedCallsData)

        refetch()
    }, [data, authToken])

    return [paginatedCallsData, loading, refetch, count, hasNextPage]
}
