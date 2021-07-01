import { createSlice} from "@reduxjs/toolkit";
import { addMessage } from "./messageSlice";

const statusSlice = createSlice({
    name: "status",
    initialState: {
        isAuthenticated: false,
        message: {
            type: "error",
            mess: null
        }
    },
    reducers : {
        setIsAuthenticated : (state,action) => {
            state.isAuthenticated = action.payload;
        },
        addServerMessage : (state, action) => {
            state.message.mess = action.payload.mess;
            state.message.type = action.payload.type;
        }
    }
})

export const {setIsAuthenticated, addServerMessage} = statusSlice.actions;
export default statusSlice.reducer;