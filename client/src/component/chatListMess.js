import React, {useState, useEffect} from 'react';
import avt from "../assets/avt.png";
import {useSelector} from "react-redux";
import $ from 'jquery';

const ListMess = () => {
    const [load,setLoad] = useState(true);
    const user = useSelector(state => state.message.user);
    const Chatroom = useSelector(state => state.message.chatRoom);
    const idx = useSelector(state => state.message.currentRoom);
    
    useEffect(() => {
        $(".list-mess").scrollTop($(".list-mess").prop('scrollHeight'));
        /*$(".list-mess").animate({
            scrollTop: $(".list-mess").prop('scrollHeight')
        }, 1000);*/
        setLoad(false);
    })
    if(load) {
        return(
            <>
                {'Loading...'}
            </>
        )
    }
    return(
        <>
        { Chatroom[idx].message.length === 0 ? "No mess" : Chatroom[idx].message.map((item, index) => {
            return(
                <div className={item.userId == user._id ? "chat-box_item right" : "chat-box_item left"} id={index === Chatroom[idx].message.length - 1 ? 'last' : ''} key={item._id}>
                    <div className="user-avt">
                        <img src={avt} alt="avatar" />
                    </div>
                    <div className="message">
                        <span id="user-name">{Chatroom[idx].user.length > 2 ? "" : ""}</span>
                        <span id="mess">{item.message_body}</span>
                        <span id="time">{`${new Date(item.created_at).getHours()}:${new Date(item.created_at).getMinutes()}`}</span>
                    </div>
                </div>
            );
        })}
        </>
    )
}

export default ListMess;