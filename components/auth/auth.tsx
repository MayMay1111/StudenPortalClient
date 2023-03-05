import { useAuth } from '@/hooks'
import { ChildrenProps } from '@/model/props'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LoadingPage } from '../Loading'

export const Auth = ({children}: ChildrenProps) => {
    const router = useRouter()

    const {data, isLoading} = useAuth()

    useEffect(() => {
        if(!isLoading && !data?.username){
            router.push("/")
        } 
    },[router, data, isLoading])
    
    if(isLoading || !data?.username) return <LoadingPage/>

    return (
        <div>
            {children}
        </div>
    )
}