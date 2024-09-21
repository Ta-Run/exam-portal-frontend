import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authClientHeader } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints, messages } from "../../constants";

// reqToClientLogin
export const reqToClientLogin = createAsyncThunk("reqToClientLogin", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.login, data);
        if (response.data.res) {
            toast.success(messages.toast.auth.login);
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToClientLogOut
export const reqToClientLogOut = createAsyncThunk("reqToClientLogOut", async () => {
    try {
        const response = await Axios.get(apiendpoints.logOut, authClientHeader());
        if (response.data?.data?.res) {
            toast.success(messages.toast.auth.logOut);
        } else {
            toast.error(response.data?.data?.msg);
        }
    } catch (error) {
        console.log(error);
    }
})