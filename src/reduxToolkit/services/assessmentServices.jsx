import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authClientHeader, authClientHeaderImage, authCommonHeader, authCommonHeaderImage } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints, messages } from "../../constants";

// ************************************** Client **************************************

//? ********** Batch Upload **********

// reqToGetClientBatchUpload
export const reqToGetClientBatchUpload = createAsyncThunk("reqToGetClientBatchUpload", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getClientBatchUpload}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());

        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToUploadClientBatchUpload
export const reqToUploadClientBatchUpload = createAsyncThunk("reqToUploadClientBatchUpload", async (data) => {
    try {

        const response = await Axios.post(apiendpoints.clientBatchUpload, data, authCommonHeaderImage());

        if (response.data.res) {
            toast.success(messages.toast.sector.addClient);
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToMoveClientBatchUpload
export const reqToMoveClientBatchUpload = createAsyncThunk("reqToMoveClientBatchUpload", async (data) => {
    try {

        const response = await Axios.post(apiendpoints.moveClientBatchUpload, { ids: data }, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.move);
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToDeleteClientBatchUpload
export const reqToDeleteClientBatchUpload = createAsyncThunk("reqToDeleteClientBatchUpload", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.deleteBatchUpload, { ids: data }, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

//? ********** Manage Batch **********

// reqToGetClientManageBatch
export const reqToGetClientManageBatch = createAsyncThunk("reqToGetClientManageBatch", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getClientManageBatch}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());
        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToAddClientManageBatch
export const reqToAddClientManageBatch = createAsyncThunk("reqToAddClientManageBatch", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addClientManageBatch, data, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.addClient);
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditClientManageBatch
export const reqToEditClientManageBatch = createAsyncThunk("reqToEditClientManageBatch", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editClientManageBatch.replace(":id", data.id), data, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.editSector);
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToDeleteClientManageBatch
export const reqToDeleteClientManageBatch = createAsyncThunk("reqToDeleteClientManageBatch", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteClientManageBatch.replace(":id", id), authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

//? ********** Scheduled Batch **********

// reqToGetClientScheduledBatch
export const reqToGetClientScheduledBatch = createAsyncThunk("reqToGetClientScheduledBatch", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getClientScheduledbatch}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());
        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

//? ********** Current Batch **********

// reqToGetClientCurrentBatch
export const reqToGetClientCurrentBatch = createAsyncThunk("reqToGetClientCurrentBatch", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getClientCurrentbatch}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());
        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})