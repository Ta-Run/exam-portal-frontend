import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authAdminHeader } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints, messages } from "../../constants";
// Import the actions
import { setToken, clearToken } from "../slice/adminAuthSlice";
// reqToAdminLogin
export const reqToAdminLogin = createAsyncThunk(
    "reqToAdminLogin",
    async (data, { dispatch }) => { // Destructure dispatch from the thunk API
        try {
            const response = await Axios.post(apiendpoints.login, data);
            if (response.data.res) {
                toast.success(messages.toast.auth.login);
                dispatch(setToken(response.data.token)); // Dispatch setToken with the received token
                return response.data;
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }
);

// reqToAdminLogOut
export const reqToAdminLogOut = createAsyncThunk(
    "reqToAdminLogOut",
    async (_, { dispatch }) => { // Destructure dispatch from the thunk API
        try {
            const response = await Axios.get(apiendpoints.logOut, authAdminHeader());
            if (response.data?.data?.res) {
                toast.success(messages.toast.auth.logOut);
                dispatch(clearToken()); // Dispatch clearToken to remove the token on logout
            } else {
                toast.error(response.data?.data?.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }
);
