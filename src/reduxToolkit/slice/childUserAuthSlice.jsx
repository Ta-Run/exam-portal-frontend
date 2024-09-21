import { createSlice } from "@reduxjs/toolkit";
import { reqToChildUserLogOut, reqToChildUserLogin } from "../services/childUserAuthServices";

const initialState = {
    loader: false,
    childUser: null,
    error: ""
}

const childUserSlice = createSlice({
    name: "childUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqToChildUserLogin
        builder.addCase(reqToChildUserLogin.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToChildUserLogin.fulfilled, (state, action) => {
            state.loader = false;
            state.childUser = action.payload.data;
        })
        builder.addCase(reqToChildUserLogin.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToChildUserLogOut
        builder.addCase(reqToChildUserLogOut.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToChildUserLogOut.fulfilled, (state) => {
            state.loader = false;
            state.childUser = null;
        })
        builder.addCase(reqToChildUserLogOut.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })
    }
})

export default childUserSlice.reducer;