import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { authClientHeader, authClientHeaderImage, authCommonHeader, authCommonHeaderImage } from "../helper/axios";
import { toast } from 'react-toastify';
import { apiendpoints, messages } from "../../constants";

// ************************************** Client **************************************

//? ********** Test Module **********

// reqToGetQuestionsModule
export const reqToGetQuestionsModule = createAsyncThunk("reqToGetQuestionsModule", async (id) => {

    try {

        const response = await Axios.get(`${apiendpoints.getTestModuleQuestion.replace(":id", id)}`, authCommonHeader());

        if (response.data.res) {
            return response.data;
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
})

export const reqToFetchCandidateDocumentDetails = createAsyncThunk("reqToFetchCandidateDocumentDetails", async (id) => {

    try {
        const response = await Axios.get(`${apiendpoints.getCondidateDocument.replace(":id", id)}`, authCommonHeader());
        console.log(response,'condidate serviceś')
        if (response.data) {
            console.log(error);
            return response.data;
        } 
    }
    catch (error) {
    } 
    })
    
    // //get exam details of client by cliend id 
    // export const reqToFetchClientExamDetails = createAsyncThunk("reqToFetchClientExamDetails", async (data) => {

//     try {
//         const response = await Axios.get(`${apiendpoints.getExamClientDeatails}`, authCommonHeader());

//         if (response.data.res) {
//             return response.data;
//         } else {
//             toast.error(response.data.msg);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })


//get exam details of client by cliend id 
export const reqToSubmitAnswer = createAsyncThunk("reqToSubmitAnswer", async (data) => {

    try {
        const response = await Axios.post(apiendpoints.submitExamAnswer, data, authCommonHeader());

             console.log("call the api submit",response.data.resultAns)
        if (response.data.resultAns) {
            console.log(response.data.resultAns,'res')
            return response.data;
        } 
    } catch (error) {
        console.log(error);
        throw error;
    }
})







