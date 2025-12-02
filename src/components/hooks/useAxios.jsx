import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://movie-master-pro-server-tan.vercel.app'
})

const useAxios = () => {
   return axiosInstance;
}

export default useAxios;