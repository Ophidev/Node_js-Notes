import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import feedSliceReducer from "./feedSlice";
import connectionSliceReducer from "./connectionSlice";
import requestSliceReducer from "./requestSlice";

const appStore = configureStore({

    reducer : {
        user : userSliceReducer,
        feed : feedSliceReducer,
        connection : connectionSliceReducer,
        requests : requestSliceReducer,
    }
});

export default appStore;