import { createSlice } from "@reduxjs/toolkit";
import { reqToFetchCandidateDocumentDetails, reqToSubmitAnswer, reqToGetQuestionsModule } from "../services/testModuleService";

const initialState = {
    loader: false,
    spocPerson: [],
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
        builder.addCase(reqToFetchCandidateDocumentDetails.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToFetchCandidateDocumentDetails.fulfilled, (state, action) => {
            state.loader = false;
            state.spocPerson = action.payload.data;
        })
        builder.addCase(reqToFetchCandidateDocumentDetails.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        //req to submit exam answer 
        //reqToFetchExamUserDetails
        builder.addCase(reqToSubmitAnswer.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToSubmitAnswer.fulfilled, (state, action) => {
            
            state.loader = false;
            state.spocPerson = action.payload;
        })
        builder.addCase(reqToSubmitAnswer.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })
    }

})

export default testModuleSlice.reducer;