import { useContext, useEffect, useState } from 'react'
import loginMutation from './login.gql'
import { useMutation } from '@apollo/client'

export default function useLogin() {
    const [loginFunction, { data, loading }] = useMutation(loginMutation)
    console.log("here testing")
    console.log("here testing 123", data, loading)

    return [loginFunction, loading, data]
}