import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authCommonHeader } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints, messages } from "../../constants";

// ************************************** Client **************************************



//get exam details of client by cliend id 
export const reqToFetchClientExamDetails = createAsyncThunk("reqToFetchClientExamDetails", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getExamClientDeatails}`, authCommonHeader());
        if (response.data) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})


//get exam details of client by cliend id 
export const reqToUploadClientDocument = createAsyncThunk("reqToUploadClientDocument", async (data) => {

    try {
        const response = await Axios.post(`${apiendpoints.uploadExamClientDoc, data}`, authCommonHeader());
        if (response.data) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})


