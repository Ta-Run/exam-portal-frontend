import { createSlice } from '@reduxjs/toolkit';
import { clientReportModule } from '../services/reportServices';

const initialState = {
  misReports: [],
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clientReportModule.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors when a new request is initiated
      })
      
      .addCase(clientReportModule.fulfilled, (state, action) => {
        console.log("rohit",action)
        state.loading = false;
        state.misReports = action.payload; // Store API response data
      })
      .addCase(clientReportModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message from payload
      });

  },
});

export default reportSlice.reducer;
