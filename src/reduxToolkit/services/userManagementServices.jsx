import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authClientHeader, authClientHeaderImage, authCommonHeader, authCommonHeaderImage } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints, messages } from "../../constants";

// ************************************** Client **************************************

//? ********** Manage Assessor **********

// reqToGetClientAssessor
export const reqToGetClientAssessor = createAsyncThunk("reqToGetClientAssessor", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getClientAssessor}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());
        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToAddClientAssessor
export const reqToAddClientAssessor = createAsyncThunk("reqToAddClientAssessor", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addClientAssessor, data, authCommonHeaderImage());

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

// reqToEditClientAssessor
export const reqToEditClientAssessor = createAsyncThunk("reqToEditClientAssessor", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editClientAssessor.replace(":id", data.id), data, authCommonHeaderImage());

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

// reqToDeleteClientAssessor
export const reqToDeleteClientAssessor = createAsyncThunk("reqToDeleteClientAssessor", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteClientAssessor.replace(":id", id), authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditStatusClientAssessor
export const reqToEditStatusClientAssessor = createAsyncThunk("reqToEditStatusClientAssessor", async (id) => {
    try {
        const response = await Axios.put(apiendpoints.editStatusClientAssessor.replace(":id", id), id, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.editSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

//? ********** Candidate Bulk Upload **********

// reqToGetClientCandidateBulkUpload
export const reqToGetClientCandidateBulkUpload = createAsyncThunk("reqToGetClientCandidateBulkUpload", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getClientCandidate}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());

        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToAddClientCandidateBulkUpload
export const reqToAddClientCandidateBulkUpload = createAsyncThunk("reqToAddClientCandidateBulkUpload", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addClientCandidate, data, authCommonHeaderImage());

        if (response.data.status) {
            toast.success(messages.toast.sector.addClient);
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToUploadClientCandidate
export const reqToUploadClientCandidate = createAsyncThunk("reqToUploadClientCandidate", async (data) => {
    try {

        const response = await Axios.post(apiendpoints.clientCandidateBulkUpload, data, authCommonHeaderImage());

        if (response.data.status) {
            toast.success(messages.toast.sector.addClient);
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToMoveClientCandidateBulkUpload
export const reqToMoveClientCandidateBulkUpload = createAsyncThunk("reqToMoveClientCandidateBulkUpload", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.moveClientCandidate, { ids: data }, authCommonHeader());

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

// reqToDeleteClientCandidateBulkUpload
export const reqToDeleteClientCandidateBulkUpload = createAsyncThunk("reqToDeleteClientCandidateBulkUpload", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.deleteCandidateBulkUpload, { ids: data }, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

//? ********** Manage Candidate **********

// reqToGetClientManageCandidate
export const reqToGetClientManageCandidate = createAsyncThunk("reqToGetClientManageCandidate", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getClientManageCandidate}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());
        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditClientManageCandidate
export const reqToEditClientManageCandidate = createAsyncThunk("reqToEditClientManageCandidate", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editClientManageCandidate.replace(":id", data.id), data, authCommonHeaderImage());

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

// reqToDeleteClientManageCandidate
export const reqToDeleteClientManageCandidate = createAsyncThunk("reqToDeleteClientManageCandidate", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteClientManageCandidate.replace(":id", id), authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})