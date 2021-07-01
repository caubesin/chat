import React, {useEffect} from "react";
import "../css/inputMessage.css";
import sticker_icon from "../assets/sitcker-icon.png";
import format_icon from "../assets/format-icon.png";
import $ from "jquery";
import {useDispatch} from "react-redux";
import {sendMessage, addMessage, updateChatRoom} from "../features/messageSlice";
import { socket } from "../app/socketIO";


const InputMessage = () => {
    const dispatch = useDispatch();
    const handleKeyDown = (e) => {
        if(e.keyCode === 13) {
            handleClick();
        }
    }
    const handleChange = (e) => {
        if(e.target.value === '') {
            $(".input-mess_left-list li:last").html('<i class="fas fa-thumbs-up"></i>');
        }
        else {
            $(".input-mess_left-list li:last").html('<i class="fal fa-paper-plane"></i>');
        }
    }
    const handleClick = () => {
        if($("#data").val() !== "") {
            dispatch(sendMessage($("#data").val()));
            $("#data").val("");
        }
    }
    useEffect(() => {
        socket.on("newMessage", (m) => {
            dispatch(addMessage(m.message));
            dispatch(updateChatRoom({
                roomId: m.message.roomId,
                updated_at: m.updated_at
            }))
            $(".list-mess").animate({
                scrollTop: $(".list-mess").prop('scrollHeight')
            }, 500);
        })
    },[])
    return(
        <>
            <div className="func-button">
                <ul className="func-button_item">
                    <li title="Send Sticker"><img src={sticker_icon} alt="sticker-icon" /></li>
                    <li title="Send Image"><i className="fal fa-image"></i></li>
                    <li title="Send File"><i className="fal fa-paperclip"></i></li>
                    <li title="Send Cart"><i className="fal fa-id-card"></i></li>
                    <li title="Message Format"><img src={format_icon} alt="Format Icon" /></li>
                    <li title="More"><i className="far fa-ellipsis-h"></i></li>
                </ul>
            </div>
            <div className="input-mess">
                <input id="data" type="text" name="input-mess" placeholder="Nhập tin nhắn..." onKeyDown = {handleKeyDown} onChange={handleChange} autoComplete="off"/>
                <div className="input-mess_left">
                    <ul className="input-mess_left-list">
                        <li title="emoji"><i className="fal fa-grin-alt"></i></li>
                        <li onClick = {handleClick}><i className="fas fa-thumbs-up"></i></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default InputMessage;