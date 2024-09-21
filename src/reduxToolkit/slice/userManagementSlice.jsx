import { createSlice } from "@reduxjs/toolkit";
import { reqToAddClientAssessor, reqToAddClientCandidateBulkUpload, reqToDeleteClientAssessor, reqToDeleteClientCandidateBulkUpload, reqToDeleteClientManageCandidate, reqToEditClientAssessor, reqToEditClientManageCandidate, reqToEditStatusClientAssessor, reqToGetClientAssessor, reqToGetClientCandidateBulkUpload, reqToGetClientManageCandidate, reqToMoveClientCandidateBulkUpload, reqToUploadClientCandidate } from "../services/userManagementServices";

const initialState = {
    loader: false,

    clientAssessor: [],
    clientAssessorPagination: {},

    clientCandidateBulk: [],
    clientCandidateBulkPagination: {},

    clientManageCandidate: [],
    clientManageCandidatePagination: {},

    error: ""
}

const userManagementSlice = createSlice({
    name: "userManagement",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // ************************************** Client **************************************

        //? ********** Manage Assessor **********

        // reqToGetClientAssessor
        builder.addCase(reqToGetClientAssessor.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientAssessor.fulfilled, (state, action) => {
            state.loader = false;
            state.clientAssessor = action.payload?.data;
            state.clientAssessorPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientAssessor.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddClientAssessor
        builder.addCase(reqToAddClientAssessor.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddClientAssessor.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddClientAssessor.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditClientAssessor
        builder.addCase(reqToEditClientAssessor.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditClientAssessor.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditClientAssessor.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientAssessor
        builder.addCase(reqToDeleteClientAssessor.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientAssessor.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientAssessor.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditStatusClientAssessor
        builder.addCase(reqToEditStatusClientAssessor.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditStatusClientAssessor.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditStatusClientAssessor.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })


        //? ********** Candidate Bulk Upload **********

        // reqToGetClientCandidateBulkUpload
        builder.addCase(reqToGetClientCandidateBulkUpload.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientCandidateBulkUpload.fulfilled, (state, action) => {
            state.loader = false;
            state.clientCandidateBulk = action.payload?.data;
            state.clientCandidateBulkPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientCandidateBulkUpload.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddClientCandidateBulkUpload
        builder.addCase(reqToAddClientCandidateBulkUpload.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddClientCandidateBulkUpload.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddClientCandidateBulkUpload.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToMoveClientCandidateBulkUpload
        builder.addCase(reqToMoveClientCandidateBulkUpload.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToMoveClientCandidateBulkUpload.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToMoveClientCandidateBulkUpload.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToUploadClientCandidate
        builder.addCase(reqToUploadClientCandidate.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToUploadClientCandidate.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToUploadClientCandidate.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientCandidateBulkUpload
        builder.addCase(reqToDeleteClientCandidateBulkUpload.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientCandidateBulkUpload.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientCandidateBulkUpload.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        //? ********** Manage Candidate **********

        // reqToGetClientManageCandidate
        builder.addCase(reqToGetClientManageCandidate.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientManageCandidate.fulfilled, (state, action) => {
            state.loader = false;
            state.clientManageCandidate = action.payload?.data;
            state.clientManageCandidatePagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientManageCandidate.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditClientManageCandidate
        builder.addCase(reqToEditClientManageCandidate.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditClientManageCandidate.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditClientManageCandidate.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientManageCandidate
        builder.addCase(reqToDeleteClientManageCandidate.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientManageCandidate.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientManageCandidate.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

    }
})

export default userManagementSlice.reducer;