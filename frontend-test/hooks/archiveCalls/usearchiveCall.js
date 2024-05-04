import { useContext, useEffect, useState } from 'react'
import archiveCallMutation from './archiveCall.gql'
import { useMutation } from '@apollo/client'

export default function useArchiveCall() {
    const [archieveFunction, { data, loading }] = useMutation(archiveCallMutation)
    console.log("here testing 123", data, loading)

    return [archieveFunction, loading, data]
}