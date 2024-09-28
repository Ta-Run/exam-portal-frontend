import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authClientHeader, authClientHeaderImage, authCommonHeader, authCommonHeaderImage } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints, messages } from "../../constants";

// ************************************** Client **************************************

//? ********** Test Module **********

// reqToGetQuestionsModule
export const reqToGetQuestionsModule = createAsyncThunk("reqToGetQuestionsModule", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getTestModuleQuestion}`, authCommonHeader());

        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

export const reqToFetchExamUserDetails = createAsyncThunk("reqToFetchExamUserDetails", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getExamUserDetaildeleteClientManageBatch.replace(":id", id)}`, authCommonHeader());

        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

