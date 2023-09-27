import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name:'token',
    initialState: {
        token: null,
    },
    reducers:{
        authreducer: (state,action) => {
            state.token = action.payload;
        },
    },
});

export const {authreducer} = tokenSlice.actions;
export default tokenSlice.reducer;