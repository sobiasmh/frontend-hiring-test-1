import { useContext, useEffect, useState } from 'react'
import addnotesMutation from './addnotes.gql'
import { useMutation } from '@apollo/client'
import { useAuth } from '@/context/AuthContext';

export default function useAddedNotes() {
    const { accessToken } = useAuth();

    const authToken = accessToken
    const [addedNotesFunction, { data, loading }] = useMutation(addnotesMutation)
    console.log("here testing 123", data, loading)

    useEffect(() => {
        console.log("viewer here", data)
      }, [authToken])
    
      

    return [addedNotesFunction, loading, data]
}