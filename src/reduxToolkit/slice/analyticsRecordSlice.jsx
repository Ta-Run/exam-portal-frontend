import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reqFetchAnalyticsRecord } from '../services/analyticsRecordServices';
// Async thunk for fetching analytics data


const initialState = {
    jobRoleStatus: [],
    stateBatchStatus: [],
    totalBatches: 0,
    totalCandidates: 0,
    totalDistricts: 0,
    totalStates: 0,
    loading: false,
    error: null,
}


const analyticsSlice = createSlice({
    name: 'analytic',
    reducers: {},
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(reqFetchAnalyticsRecord.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new fetch
            })
            .addCase(reqFetchAnalyticsRecord.fulfilled, (state, action) => {
                console.log(action)
                state.loading = false;
                state.stateCount = action.payload.totalStates;
                state.batchCount = action.payload.totalBatches;
                state.districtCount = action.payload.totalDistricts;
                state.candidateCount = action.payload.totalCandidates;
                state.jobRoleStatus = action.payload.jobRoleStatus
                state.stateBatchStatus = action.payload.stateBatchStatus
            })
            .addCase(reqFetchAnalyticsRecord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// export const { setAnalyticsData } = analyticsSlice.actions;
export default analyticsSlice.reducer;
