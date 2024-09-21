import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authAdminHeader } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints, messages } from "../../constants";

// reqToAdminLogin
export const reqToAdminLogin = createAsyncThunk("reqToAdminLogin", async (data) => {
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

// reqToAdminLogOut
export const reqToAdminLogOut = createAsyncThunk("reqToAdminLogOut", async () => {
    try {
        const response = await Axios.get(apiendpoints.logOut, authAdminHeader());
        if (response.data?.data?.res) {
            toast.success(messages.toast.auth.logOut);
        } else {
            toast.error(response.data?.data?.msg);
        }
    } catch (error) {
        console.log(error);
    }
})