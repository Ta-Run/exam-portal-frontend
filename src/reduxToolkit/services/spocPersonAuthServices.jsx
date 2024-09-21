import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authClientHeader, authSpocPersonHeader } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints, messages } from "../../constants";

// reqToSpocPersonLogin
export const reqToSpocPersonLogin = createAsyncThunk("reqToSpocPersonLogin", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.spocPersonLogin, data);
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

// reqToSpocPersonLogOut
export const reqToSpocPersonLogOut = createAsyncThunk("reqToSpocPersonLogOut", async () => {
    try {
        const response = await Axios.get(apiendpoints.spocPersonLogOut, authSpocPersonHeader());
        if (response.data?.data?.res) {
            toast.success(messages.toast.auth.logOut);
        } else {
            toast.error(response.data?.data?.msg);
        }
    } catch (error) {
        console.log(error);
    }
})