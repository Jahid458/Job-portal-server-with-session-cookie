import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    baseURL: 'https://job-portal-server-for-recruiter-part3-psi-vert.vercel.app',
    withCredentials: true
  });

const useAxiosSecure = () => {
    const {signOutUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        axiosInstance.interceptors.response.use(response =>{
            return response
        }, error => {
            console.log('errr status', error.status);
            if(error.status === 401 || error.status === 403){
                signOutUser()
                .then(()=>{
                    navigate('/signin')
                })
                .catch(err => console.log(err)
                )
            }
            return Promise.reject(error)
        })
    },[])
    
   return axiosInstance
};

export default useAxiosSecure;