import { createSlice } from "@reduxjs/toolkit";
import { reqToAddClientManageBatch, reqToDeleteClientBatchUpload, reqToDeleteClientManageBatch, reqToEditClientManageBatch, reqToGetClientBatchUpload, reqToGetClientCurrentBatch, reqToGetClientManageBatch, reqToGetClientScheduledBatch, reqToMoveClientBatchUpload, reqToUploadClientBatchUpload } from "../services/assessmentServices";

const initialState = {
    loader: false,

    clientBatchUpload: [],
    clientBatchUploadPagination: {},

    clientManageBatch: [],
    clientManageBatchPagination: {},

    clientScheduledBatch: [],
    clientScheduledBatchPagination: {},

    clientCurrentBatch: [],
    clientCurrentBatchPagination: {},

    error: ""
}

const assessmentSlice = createSlice({
    name: "assessment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // ************************************** Client **************************************

        //? ********** Batch Upload **********

        // reqToGetClientBatchUpload
        builder.addCase(reqToGetClientBatchUpload.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientBatchUpload.fulfilled, (state, action) => {
            state.loader = false;
            state.clientBatchUpload = action.payload?.data;
            state.clientBatchUploadPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientBatchUpload.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToUploadClientBatchUpload
        builder.addCase(reqToUploadClientBatchUpload.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToUploadClientBatchUpload.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToUploadClientBatchUpload.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToMoveClientBatchUpload
        builder.addCase(reqToMoveClientBatchUpload.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToMoveClientBatchUpload.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToMoveClientBatchUpload.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientBatchUpload
        builder.addCase(reqToDeleteClientBatchUpload.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientBatchUpload.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientBatchUpload.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        //? ********** Manage Batch **********

        // reqToGetClientManageBatch
        builder.addCase(reqToGetClientManageBatch.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientManageBatch.fulfilled, (state, action) => {
            state.loader = false;
            state.clientManageBatch = action.payload?.data;
            state.clientManageBatchPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientManageBatch.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddClientManageBatch
        builder.addCase(reqToAddClientManageBatch.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddClientManageBatch.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddClientManageBatch.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditClientManageBatch
        builder.addCase(reqToEditClientManageBatch.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditClientManageBatch.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditClientManageBatch.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientManageBatch
        builder.addCase(reqToDeleteClientManageBatch.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientManageBatch.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientManageBatch.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        //? ********** Scheduled Batch **********

        // reqToGetClientScheduledBatch
        builder.addCase(reqToGetClientScheduledBatch.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientScheduledBatch.fulfilled, (state, action) => {
            state.loader = false;
            state.clientScheduledBatch = action.payload?.data;
            state.clientScheduledBatchPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientScheduledBatch.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        //? ********** Current Batch **********

        // reqToGetClientCurrentBatch
        builder.addCase(reqToGetClientCurrentBatch.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientCurrentBatch.fulfilled, (state, action) => {
            state.loader = false;
            state.clientCurrentBatch = action.payload?.data;
            state.clientCurrentBatchPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientCurrentBatch.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })
    }
})

export default assessmentSlice.reducer;