import { createSlice } from "@reduxjs/toolkit";
import { reqToAdminLogOut, reqToAdminLogin } from "../services/adminAuthServices";

const initialState = {
    loader: false,
    admin: null,
    error: ""
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqToAdminLogin
        builder.addCase(reqToAdminLogin.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAdminLogin.fulfilled, (state, action) => {
            state.loader = false;
            state.admin = action.payload.data;
        })
        builder.addCase(reqToAdminLogin.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAdminLogOut
        builder.addCase(reqToAdminLogOut.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAdminLogOut.fulfilled, (state, action) => {
            state.loader = false;
            state.admin = null;
        })
        builder.addCase(reqToAdminLogOut.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })
    }
})

export default adminSlice.reducer;