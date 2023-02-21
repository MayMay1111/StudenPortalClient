import { LoginPayLoad } from "@/model/auth"
import axiosClient from "./axios-client"


export const authApi = {
    login(payload:LoginPayLoad){
        return axiosClient.post('/login',payload)
    },
    logout(){
        return axiosClient.post('/logout')
    },
}