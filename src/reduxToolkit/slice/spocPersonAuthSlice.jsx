import { createSlice } from "@reduxjs/toolkit";
import { reqToSpocPersonLogOut, reqToSpocPersonLogin } from "../services/spocPersonAuthServices";

const initialState = {
    loader: false,
    spocPerson: null,
    error: ""
}

const spocPersonSlice = createSlice({
    name: "spocPerson",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqToSpocPersonLogin
        builder.addCase(reqToSpocPersonLogin.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToSpocPersonLogin.fulfilled, (state, action) => {
            state.loader = false;
            state.spocPerson = action.payload.data;
        })
        builder.addCase(reqToSpocPersonLogin.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToSpocPersonLogOut
        builder.addCase(reqToSpocPersonLogOut.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToSpocPersonLogOut.fulfilled, (state) => {
            state.loader = false;
            state.spocPerson = null;
        })
        builder.addCase(reqToSpocPersonLogOut.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })
    }
})

export default spocPersonSlice.reducer;