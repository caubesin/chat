import React, {useState} from 'react';
import ChatRoomItem from './chatRoomItem';
import "../css/chatRoom.css";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentRoom } from '../features/messageSlice';
import CreateChatRoomModal from './createChatRoom';
import $ from 'jquery';

const ChatRoom = () => {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const ChatRoom = useSelector(state => state.message.chatRoom);
    const handleClick = (e) => {
        $(".active").removeClass(' active');
        e.currentTarget.className += ' active';
        dispatch(setCurrentRoom(e.currentTarget.dataset.id));
    }
    const addFriend = () => {

    }
    const handleClose = () => {
        setOpen(false);
    }
    return(
        <>
           {open ?  <CreateChatRoomModal handleClose={handleClose} open={open}></CreateChatRoomModal> : ""}
            <div className="search-box">
                <div className="search-input">
                    <input type="text" name="findInput" placeholder="Search..."/>
                    <span><i className="fal fa-search"></i></span>
                </div>
                <span onClick={addFriend}><i className="fal fa-user-plus"></i></span>
                <span onClick={() => setOpen(true)}><i className="fal fa-users-medical"></i></span>
            </div>
            <div className="classify">
                <span><i className="fas fa-caret-right"></i>Classify</span>
                <div className="classify-item">
                    
                </div>
            </div>
            <div className='chat-room-list'>
            {ChatRoom.map((item) => {
                return(<ChatRoomItem data={item} key ={item._id} data_id={item._id} onClick = {handleClick}></ChatRoomItem>);
            })}
            </div>
        </>
    )
}

export default ChatRoom;