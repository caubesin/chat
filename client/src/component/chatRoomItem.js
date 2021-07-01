import React from 'react';
import { Avatar } from '@material-ui/core';
import avt from '../assets/avt.png';
import { useSelector } from 'react-redux';
import Time from './time';


const ChatRoomItem = (props) => {
    const user = useSelector(state => state.message.user);
    const other_user = props.data.user.filter((user) => user.id !== user._id );

    return(
        <div className='chat-room-item' data-id={props.data_id} onClick={props.onClick}>
            <Avatar src={avt}></Avatar>
            <div className='item'>
                <div className='item-info'>
                    <p>{props.data.name === '' ? other_user[0].username : props.data.name}</p>
                    <span><Time data={props.data.updated_at}></Time></span>
                </div>
                <span>{props.data.message.length === 0 ? "" : props.data.message[props.data.message.length-1].userId === user._id ? 'Bạn: ' : ''}{props.data.message.length === 0 ? '' : props.data.message[props.data.message.length-1].message_body}</span>
            </div>
        </div>
    )
}

export default ChatRoomItem;