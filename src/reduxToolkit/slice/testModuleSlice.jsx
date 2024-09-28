import { createSlice } from "@reduxjs/toolkit";
import {reqToGetQuestionsModule } from "../services/testModuleService";
import { reqToFetchExamUserDetails } from "../services/testModuleService";
const initialState = {
    loader: false,
    spocPerson: null,
    error: ""
}

const testModuleSlice = createSlice({
    name: "testModule",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqToGetQuestionsModule
        builder.addCase(reqToGetQuestionsModule.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetQuestionsModule.fulfilled, (state, action) => {
            state.loader = false;
            state.spocPerson = action.payload.data;
        })
        builder.addCase(reqToGetQuestionsModule.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })
       
         //reqToFetchExamUserDetails
         builder.addCase(reqToFetchExamUserDetails.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToFetchExamUserDetails.fulfilled, (state, action) => {
            state.loader = false;
            state.spocPerson = action.payload.data;
        })
        builder.addCase(reqToFetchExamUserDetails.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })
    }

    
})

export default testModuleSlice.reducer;