import { createSlice } from "@reduxjs/toolkit";
import { reqToClientLogOut, reqToClientLogin } from "../services/clientAuthServices";

const initialState = {
    loader: false,
    client: null,
    error: ""
}

const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqToClientLogin
        builder.addCase(reqToClientLogin.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToClientLogin.fulfilled, (state, action) => {
            state.loader = false;
            state.client = action.payload.data;
        })
        builder.addCase(reqToClientLogin.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToClientLogOut
        builder.addCase(reqToClientLogOut.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToClientLogOut.fulfilled, (state, action) => {
            state.loader = false;
            state.client = null;
        })
        builder.addCase(reqToClientLogOut.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })
    }
})

export default clientSlice.reducer;