import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authSpocPersonHeader } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints, messages } from "../../constants";

// reqToChildUserLogin
export const reqToChildUserLogin = createAsyncThunk("reqToChildUserLogin", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.childUserLogin, data);
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

// reqToChildUserLogOut
export const reqToChildUserLogOut = createAsyncThunk("reqToChildUserLogOut", async () => {
    try {
        const response = await Axios.get(apiendpoints.childUserLogOut, authSpocPersonHeader());
        if (response.data?.data?.res) {
            toast.success(messages.toast.auth.logOut);
        } else {
            toast.error(response.data?.data?.msg);
        }
    } catch (error) {
        console.log(error);
    }
})