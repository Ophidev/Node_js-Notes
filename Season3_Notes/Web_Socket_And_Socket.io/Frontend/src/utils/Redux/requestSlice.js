import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const requestSlice = createSlice({

    name : "requests",
    initialState : null,
    reducers : {

        addRequests : (state,action) => action.payload,
        removeRequests : (state,action) => {

            const newArray = state?.filter((request) => request?._id != action.payload);
            console.log(state);
            return newArray;
        },
    },
    
});

export const {addRequests,removeRequests} = requestSlice.actions;
export default requestSlice.reducer;