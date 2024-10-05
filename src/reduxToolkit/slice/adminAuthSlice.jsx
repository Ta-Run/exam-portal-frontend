import { createSlice } from "@reduxjs/toolkit";
import { reqToAdminLogOut, reqToAdminLogin } from "../services/adminAuthServices";

const initialState = {
    loader: false,
    admin: null,
    token: null, // Add token to initial state
    error: ""
}

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload; // Set the token
        },
        clearToken(state) {
            state.token = null; // Clear the token
        },
    },
    extraReducers: (builder) => {
        // reqToAdminLogin
        builder.addCase(reqToAdminLogin.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAdminLogin.fulfilled, (state, action) => {
            state.loader = false;
            state.admin = action.payload.data;
            state.token = action.payload.token; // Set the token on successful login
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
            state.token = null; // Clear the token on logout
        })
        builder.addCase(reqToAdminLogOut.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })
    }
})

// Export the setToken and clearToken actions
export const { setToken, clearToken } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
