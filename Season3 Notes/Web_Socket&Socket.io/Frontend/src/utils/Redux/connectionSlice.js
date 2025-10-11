import {createSlice} from "@reduxjs/toolkit";
import { act } from "react";

const connectionSlice = createSlice({
    name : "connection",
    initialState : null,
    reducers : {

        addConnections : (state,action) => action.payload,
        removeConnections : (state,action) => null,
    }
});

export const {addConnections,removeConnections} = connectionSlice.actions;
export default connectionSlice.reducer;