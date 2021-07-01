import React from "react";
import "../css/chatBox.css";
import {useSelector} from "react-redux";
import ChatHeader from "./chatHeader";
import InputMessage from "./inputMessage";
import ListMess from './chatListMess';

const ChatBox = () => {
    const currentRoom = useSelector(state => state.message.currentRoom);
    return(
        <>
         {
            currentRoom === null ? '' :
             <>
                <div className ="chat-header">
                    <ChatHeader currentRoom={currentRoom}></ChatHeader>
                </div>
                <div className='list-mess'>
                    <ListMess></ListMess>
                </div>
                <div className ="input-message">
                    <InputMessage></InputMessage>
                </div>
             </>
         }
        </>
    )
}

export default ChatBox;