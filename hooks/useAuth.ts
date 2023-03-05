import { authApi } from '@/axios-client'
import { LoginPayLoad } from '@/model/auth'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/_internal'

export const useAuth = (options?: Partial<PublicConfiguration>) => {
    const {data, error, mutate} = useSWR('./profile', {
        dedupingInterval: 60*60*1000,
        revalidateOnFocus:false,
        ...options,
    })

    const isLoading = data === undefined && error === undefined 

    const login = async (data: LoginPayLoad) => {
        await authApi.login(data)

        await mutate()
    }

    const logout = async () => {
        await authApi.logout()
        mutate(null, false)
    }

    return {
        data,
        error,
        login,
        logout,
        isLoading,
    }
}