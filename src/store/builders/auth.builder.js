import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient, { setToken } from "../../services/axios";
import { setUserToken } from "../slices/auth.slice";
import { toast } from "react-toastify";

export const loginWithPassword = createAsyncThunk('auth/login-with-email', async ({email, password, navigate },{dispatch})=> {
    try {
        const response = await apiClient.post('auth/login', { email, password });
        console.log("response===>", response)
        if(response.status == 200){
          setToken(response?.data?.accessToken);
          dispatch(setUserToken(response?.data?.accessToken))
          navigate('/dashboard')
      }
      return response.data;
    } catch (error) {
        // toast.error(error?.response?.data?.message, {
        // className: 'custom-toast-error',
        // progressStyle: { background: '#C53C43' },
        // })
        // toast.error(error.response.data.message)
        throw error.response.data;
    }
})