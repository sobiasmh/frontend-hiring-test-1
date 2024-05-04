import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import loggedUserQuery from './loggedUser.gql'
import { useAuth } from '@/context/AuthContext';

export default function useLoggedUser() {
    const { accessToken } = useAuth();

  const authToken = accessToken
  console.log("viewer here", authToken)

  const { loading, data, refetch } = useQuery(loggedUserQuery)

  useEffect(() => {
    console.log("viewer here", data)
    refetch()
  }, [authToken])

  

  return [data, loading, refetch]
}
