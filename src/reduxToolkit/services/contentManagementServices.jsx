import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authAdminHeader, authAdminHeaderImage, authClientHeader, authClientHeaderImage, authCommonHeader, authCommonHeaderImage } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints, messages } from "../../constants";

// ************************************** Admin **************************************


//? ********** Manage Sector **********

// reqToGetSector
export const reqToGetSector = createAsyncThunk("reqToGetSector", async (data) => {
    try {
        const response = await Axios.get(`${apiendpoints.getSector}?page=${data.page || 1}&limit=${data.limit || 10}`, authAdminHeader());
        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToAddSector
export const reqToAddSector = createAsyncThunk("reqToAddSector", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addSector, data, authAdminHeaderImage());
        if (response.data.res) {
            toast.success(messages.toast.sector.addSector);
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditSector
export const reqToEditSector = createAsyncThunk("reqToEditSector", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editSector.replace(":id", data.id), data, authAdminHeaderImage());

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

// reqToDeleteSector
export const reqToDeleteSector = createAsyncThunk("reqToDeleteSector", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteSector.replace(":id", id), authAdminHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditStatusSector
export const reqToEditStatusSector = createAsyncThunk("reqToEditStatusSector", async (id) => {
    try {
        const response = await Axios.put(apiendpoints.editStatusSector.replace(":id", id), id, authAdminHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.editSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})


//? ********** Manage Clients **********

// reqToGetClients
export const reqToGetClients = createAsyncThunk("reqToGetClients", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getClient}?page=${data.page || 1}&limit=${data.limit || 10}`, authAdminHeader());
        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToAddClients
export const reqToAddClients = createAsyncThunk("reqToAddClients", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addClient, data, authAdminHeader());

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

// reqToEditClients
export const reqToEditClients = createAsyncThunk("reqToEditClients", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editClient.replace(":id", data.id), data, authAdminHeader());

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

// reqToDeleteClients
export const reqToDeleteClients = createAsyncThunk("reqToDeleteClients", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteClient.replace(":id", id), authAdminHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditStatusClients
export const reqToEditStatusClients = createAsyncThunk("reqToEditStatusClients", async (id) => {
    try {
        const response = await Axios.put(apiendpoints.editStatusClient.replace(":id", id), id, authAdminHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.editSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// ************************************** Client **************************************

//? ********** Manage SPOC Person **********

// reqToGetClientSector
export const reqToGetClientSector = createAsyncThunk("reqToGetClientSector", async (data) => {

    try {
        const response = await Axios.get(`${apiendpoints.getSpocPerson}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());
        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToAddClientSector
export const reqToAddClientSector = createAsyncThunk("reqToAddClientSector", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addSpocPerson, data, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.addClient);
            return response?.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditClientSector
export const reqToEditClientSector = createAsyncThunk("reqToEditClientSector", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editSpocPerson.replace(":id", data.id), data, authCommonHeader());

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

// reqToDeleteClientSector
export const reqToDeleteClientSector = createAsyncThunk("reqToDeleteClientSector", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteSpocPerson.replace(":id", id), authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditStatusClientSector
export const reqToEditStatusClientSector = createAsyncThunk("reqToEditStatusClientSector", async (id) => {
    try {
        const response = await Axios.put(apiendpoints.editStatusSpocPerson.replace(":id", id), id, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.editSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})


//? ********** Manage Job Role **********

// reqToGetClientJobRole
export const reqToGetClientJobRole = createAsyncThunk("reqToGetClientJobRole", async (data) => {
    try {
        const response = await Axios.get(`${apiendpoints.getClientJobRole}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());
        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToAddClientJobRole
export const reqToAddClientJobRole = createAsyncThunk("reqToAddClientJobRole", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addClientJobRole, data, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.addClient);
            return response?.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditClientJobRole
export const reqToEditClientJobRole = createAsyncThunk("reqToEditClientJobRole", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editClientJobRole.replace(":id", data.id), data, authCommonHeader());

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

// reqToDeleteClientJobRole
export const reqToDeleteClientJobRole = createAsyncThunk("reqToDeleteClientJobRole", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteClientJobRole.replace(":id", id), authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditStatusClientJobRole
export const reqToEditStatusClientJobRole = createAsyncThunk("reqToEditStatusClientJobRole", async (id) => {
    try {
        const response = await Axios.put(apiendpoints.editStatusClientJobRole.replace(":id", id), id, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.editSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})


//? ********** Manage NOS **********

// reqToGetClientNos
export const reqToGetClientNos = createAsyncThunk("reqToGetClientNos", async (data) => {
    try {
        const response = await Axios.get(`${apiendpoints.getClientNos}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());

        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToAddClientNos
export const reqToAddClientNos = createAsyncThunk("reqToAddClientNos", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addClientNos, data, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.addClient);
            return response?.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditClientNos
export const reqToEditClientNos = createAsyncThunk("reqToEditClientNos", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editClientNos.replace(":id", data.id), data, authCommonHeader());

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

// reqToDeleteClientNos
export const reqToDeleteClientNos = createAsyncThunk("reqToDeleteClientNos", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteClientNos.replace(":id", id), authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})


//? ********** Manage Scheme **********

// reqToGetClientScheme
export const reqToGetClientScheme = createAsyncThunk("reqToGetClientScheme", async (data) => {
    try {
        const response = await Axios.get(`${apiendpoints.getClientScheme}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());

        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToAddClientScheme
export const reqToAddClientScheme = createAsyncThunk("reqToAddClientScheme", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addClientScheme, data, authCommonHeader());

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

// reqToEditClientScheme
export const reqToEditClientScheme = createAsyncThunk("reqToEditClientScheme", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editClientScheme.replace(":id", data.id), data, authCommonHeader());

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

// reqToDeleteClientScheme
export const reqToDeleteClientScheme = createAsyncThunk("reqToDeleteClientScheme", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteClientScheme.replace(":id", id), authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditStatusClientScheme
export const reqToEditStatusClientScheme = createAsyncThunk("reqToEditStatusClientScheme", async (id) => {
    try {
        const response = await Axios.put(apiendpoints.editStatusClientScheme.replace(":id", id), id, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.editSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})


//? ********** Manage Question Bank **********

// reqToGetClientQuestionBank
export const reqToGetClientQuestionBank = createAsyncThunk("reqToGetClientQuestionBank", async (data) => {
    try {
        const response = await Axios.get(`${apiendpoints.getClientQuestionBank}?page=${data.page || 1}&limit=${data.limit || 10}`, authCommonHeader());

        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToAddClientQuestionBank
export const reqToAddClientQuestionBank = createAsyncThunk("reqToAddClientQuestionBank", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addClientQuestionBank, data, authCommonHeader());

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

// reqToEditClientQuestionBank
export const reqToEditClientQuestionBank = createAsyncThunk("reqToEditClientQuestionBank", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editClientQuestionBank.replace(":id", data.id), data, authCommonHeader());

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

// reqToDeleteClientQuestionBank
export const reqToDeleteClientQuestionBank = createAsyncThunk("reqToDeleteClientQuestionBank", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteClientQuestionBank.replace(":id", id), authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditStatusClientQuestionBank
export const reqToEditStatusClientQuestionBank = createAsyncThunk("reqToEditStatusClientQuestionBank", async (id) => {
    try {
        const response = await Axios.put(apiendpoints.editStatusClientQuestionBank.replace(":id", id), id, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.editSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})


//? ********** Manage Question **********

// reqToGetClientQuestion
export const reqToGetClientQuestion = createAsyncThunk("reqToGetClientQuestion", async (data) => {
    try {
        const response = await Axios.get(`${apiendpoints.getClientQuestion.replace(":id", data.id)}?page=${data?.page || 1}&limit=${data?.limit || 10}`, authCommonHeader());

        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToUploadClientQuestions
export const reqToUploadClientQuestions = createAsyncThunk("reqToUploadClientQuestions", async (data) => {
    try {

        const response = await Axios.post(apiendpoints.uploadClientQuestion, data, authCommonHeaderImage());

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

// reqToAddClientQuestion
export const reqToAddClientQuestion = createAsyncThunk("reqToAddClientQuestion", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addClientQuestion, data, authCommonHeaderImage());

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

// reqToEditClientQuestion
export const reqToEditClientQuestion = createAsyncThunk("reqToEditClientQuestion", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editClientQuestion.replace(":id", data.id), data, authCommonHeaderImage());

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

// reqToDeleteClientQuestion
export const reqToDeleteClientQuestion = createAsyncThunk("reqToDeleteClientQuestion", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteClientQuestion.replace(":id", id), authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditStatusClientQuestion
export const reqToEditStatusClientQuestion = createAsyncThunk("reqToEditStatusClientQuestion", async (id) => {
    try {
        const response = await Axios.put(apiendpoints.editStatusClientQuestion.replace(":id", id), id, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.editSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})


//? ********** Manage Child User **********

// reqToGetClientChildUser
export const reqToGetClientChildUser = createAsyncThunk("reqToGetClientChildUser", async (data) => {
    try {
        const response = await Axios.get(`${apiendpoints.getClientChildUser}?page=${data?.page || 1}&limit=${data.limit || 10}`, authCommonHeader());

        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToAddClientChildUser
export const reqToAddClientChildUser = createAsyncThunk("reqToAddClientChildUser", async (data) => {
    try {
        const response = await Axios.post(apiendpoints.addClientChildUser, data, authCommonHeader());

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

// reqToEditClienChildUser
export const reqToEditClienChildUser = createAsyncThunk("reqToEditClienChildUser", async (data) => {
    try {
        const response = await Axios.put(apiendpoints.editClientChildUser.replace(":id", data?.id), data, authCommonHeader());

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

// reqToDeleteClientChildUser
export const reqToDeleteClientChildUser = createAsyncThunk("reqToDeleteClientChildUser", async (id) => {
    try {
        const response = await Axios.delete(apiendpoints.deleteClientChildUser.replace(":id", id), authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.deleteSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToEditStatusClientChildUser
export const reqToEditStatusClientChildUser = createAsyncThunk("reqToEditStatusClientChildUser", async (id) => {
    try {
        const response = await Axios.put(apiendpoints.editStatusClientChildUser.replace(":id", id), id, authCommonHeader());

        if (response.data.res) {
            toast.success(messages.toast.sector.editSector);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// ************************************** Admin DropDown **************************************

// reqToGetAdminSectorDropDown
export const reqToGetAdminSectorDropDown = createAsyncThunk("reqToGetAdminSectorDropDown", async () => {
    try {
        const response = await Axios.get(apiendpoints.getSectorDropDown, authAdminHeader());

        if (response.data.req) {
            return response.data.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// ************************************** Client DropDown **************************************

// reqToGetSectorDropDown
export const reqToGetSectorDropDown = createAsyncThunk("reqToGetSectorDropDown", async () => {
    try {
        const response = await Axios.get(apiendpoints.getSectorDropDown, authCommonHeader());

        if (response.data.req) {
            return response.data.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToGetClientJobRoleDropDown
export const reqToGetClientJobRoleDropDown = createAsyncThunk("reqToGetClientJobRoleDropDown", async () => {
    try {
        const response = await Axios.get(apiendpoints.getClientJobRoleDropDown, authCommonHeader());

        if (response.data.res) {
            return response.data.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToGetNosDropDown
export const reqToGetNosDropDown = createAsyncThunk("reqToGetNosDropDown", async () => {
    try {
        const response = await Axios.get(apiendpoints.getNosDropDown, authCommonHeader());

        if (response.data.res) {
            return response.data.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

// reqToGetBatchDropDown
export const reqToGetBatchDropDown = createAsyncThunk("reqToGetBatchDropDown", async () => {
    try {
        const response = await Axios.get(apiendpoints.getBatchDropDown, authCommonHeader());

        if (response.data.res) {
            return response.data.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})