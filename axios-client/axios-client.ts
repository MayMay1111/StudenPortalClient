import axios from 'axios'

const axiosClient = axios.create({
    baseURL:'/api',
    headers:{
        'Content-Type':'application/json'
    }
})

axios.interceptors.response.use(
    function (response){
        return response.data
    },

    function (err){
        return Promise.reject(err)
    }
)

export default axiosClient