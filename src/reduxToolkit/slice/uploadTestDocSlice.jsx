import { createSlice } from "@reduxjs/toolkit";

import { reqToUploadClientDocument,reqToFetchClientExamDetails } from "../services/uploadTestDocService";

const initialState = {
    loader: false,
    clientdata: [],
    error: ""
}

const UploadTestDocSlice = createSlice({
    name: "uploadTestDoc",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqToFetchClientExamDetails
        builder.addCase(reqToFetchClientExamDetails.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqToFetchClientExamDetails.fulfilled, (state, action) => {
            console.log(action);
            state.loader = false;
            state.clientdata = action.payload.data;
        });
        builder.addCase(reqToFetchClientExamDetails.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqToUploadClientDocument
        builder.addCase(reqToUploadClientDocument.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqToUploadClientDocument.fulfilled, (state, action) => {
            state.loader = false;
            state.clientdata = action.payload.msg
            ;
        });
        builder.addCase(reqToUploadClientDocument.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });
    }
});


export default UploadTestDocSlice.reducer;