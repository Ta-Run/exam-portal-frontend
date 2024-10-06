import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authCommonHeader } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints } from "../../constants";

// reqFetchAnalyticsRecord
export const reqFetchAnalyticsRecord = createAsyncThunk("reqFetchAnalyticsRecord", async (data) => {
    try {
        // Destructure sectorId, from, and to from the data object
        const { sectorId, from, to } = data;

        // console.log('seddd',sectorId, from, to)

        // Construct the full URL with query parameters
        const url = `${apiendpoints.getAnalyticsRecordsReport.replace(":id", sectorId)}?from=${from}&to=${to}`;


        // Make the API request
        const response = await Axios.get(url, authCommonHeader());
        console.log('response', response)

        // Check if response contains data
        if (response.data) {
            return response.data;  // Return the data to be handled in Redux
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.error("Error fetching analytics record:", error);
        toast.error("Failed to fetch analytics records. Please try again.");
    }
});

export const reqFetchQuestionAnalyticsRecord = createAsyncThunk("reqFetchQuestionAnalyticsRecord", async (data) => {
    try {
        
        const { id, startDate, endDate } = data;
        const url = `${apiendpoints.getQuestionAnalyticsRecordsReport.replace(":id", id)}?from=${startDate}&to=${endDate}`;

        const response = await Axios.get(url, authCommonHeader());

        // Check if response contains data
        if (response.data) {
            return response.data;  // Return the data to be handled in Redux
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.error("Error fetching analytics record:", error);
        toast.error("Failed to fetch analytics records. Please try again.");
    }
});

export const reqFetchQuestionDropDown = createAsyncThunk("reqFetchQuestionDropDown", async (data) => {
    try {
        
       
        const url = `${apiendpoints.getQuesitonBankDropDown}`;

        const response = await Axios.get(url, authCommonHeader());

        // Check if response contains data
        if (response.data) {
            return response.data;  // Return the data to be handled in Redux
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.error("Error fetching analytics record:", error);
        toast.error("Failed to fetch analytics records. Please try again.");
    }
});


export const reqFetchAssesorDropDown = createAsyncThunk("reqFetchAssesorDropDown", async (id) => {
    try {
        
       
        const url = `${apiendpoints.getAssessorDropDown.replace(":id", id)}`;

        const response = await Axios.get(url, authCommonHeader());

        // Check if response contains data
        if (response.data) {
            return response.data;  // Return the data to be handled in Redux
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.error("Error fetching analytics record:", error);
        toast.error("Failed to fetch analytics records. Please try again.");
    }
});


