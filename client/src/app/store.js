import {configureStore} from "@reduxjs/toolkit";
import messageReducer from "../features/messageSlice";
import statusReducer from "../features/statusSlice";

const store = configureStore({
    reducer : {
        message : messageReducer,
        status: statusReducer
    }
})

export default store;