import { createSlice, current} from "@reduxjs/toolkit";
import {sendMess} from "../app/socketIO";

const messageSlice = createSlice({
    name : "message",
    initialState : {
        chatRoom: new Array(),
        user: null,
        currentRoom: null,
        loadMessage: true
    },
    reducers : {
        sendMessage: (state, action) => {
            sendMess(action.payload, state.chatRoom[state.currentRoom]._id, state.user._id);
        },
        addMessage : (state, action) => {
            const findEl = (el) => el._id === action.payload.roomId;
            const index = state.chatRoom.findIndex(findEl);
            state.chatRoom[index].message.push(action.payload);
        },
        setUser : (state, action) => {
            state.user = action.payload;
        },
        setRoom : (state,action) => {
            state.chatRoom = action.payload;
        },
        setLoadMessage : (state, action) => {
            state.loadMessage = action.payload;
        },
        updateChatRoom: (state, action) => {
            const findEl = (el) => el._id === action.payload.roomId;
            const index = state.chatRoom.findIndex(findEl);
            state.chatRoom[index].updated_at = action.payload.updated_at;
        },
        setCurrentRoom: (state, action) => {
            const findEl = (el) => el._id === action.payload;
            const index = state.chatRoom.findIndex(findEl);
            state.currentRoom = index;
        }
    }
});



export const {sendMessage ,addMessage, setUser, setRoom, setLoadMessage, updateChatRoom, setCurrentRoom} = messageSlice.actions;
export default messageSlice.reducer;