import React from "react";
import avt from "../assets/avt.png";
import "../css/chatHeader.css";
import { useSelector } from 'react-redux';

const ChatHeader = (props) => {
    const ChatRoom = useSelector(state => state.message.chatRoom);
    const user = useSelector(state => state.message.user);
    const other_user = ChatRoom[props.currentRoom].user.filter((user) => user.id !== user._id );
    return(
        <>
            <div className="left-chat-header">
                <div className="left-chat-header_item">
                    <img src={avt} alt="Avatar" />
                    <div className="user-info">
                        <span className="name">{ChatRoom[props.currentRoom].name === '' ? other_user[0].username : ChatRoom[props.currentRoom].name}</span>
                        <span className="online-status">Đang hoạt động</span>
                    </div>
                </div>
            </div>
            <div className="right-chat-header">
                <ul className="right-chat-header_button">
                    <li title="Find Message"><i className="far fa-search"></i></li>
                    <li title="Call"><i className="far fa-phone"></i></li>
                    <li title="Call Video"><i className="far fa-video"></i></li>
                    <li title="Chat Information"><i className="fal fa-window-maximize"></i></li>
                </ul>
            </div>
        </>
    )
}

export default ChatHeader;