import React from 'react';
import { useDispatch } from 'react-redux';
import { addServerMessage } from "../features/statusSlice";
import sendReq from '../helper/sendReq';
import qs from 'qs';
import $ from 'jquery';
import { Button } from '@material-ui/core';

const CreateChatRoomModal = (props) => {
    const dispatch = useDispatch();
    const createGroup = async () => {
        const config = {
            method: 'post',
            url: '/chat/createChatRoom',
            header: 'application/x-www-form-urlencoded;charset=utf-8',
            data: qs.stringify({
                'room_name' : `${$('#room_name').val()}`
            })
        }
        const res = await sendReq(config);
        dispatch(addServerMessage(res.data.message));
        console.log(res);
    }
    const handleChange = (e) => {

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if($('#room_name').val() === '') {
            return;
        }
        createGroup();
    }

    return(
        <>
            <div className='popover-container'>
                <form onSubmit={handleSubmit} className='create-chat-group'>
                    <div className="create-chat-group__header">
                        <button type="button" onClick={props.handleClose}><i className="fal fa-times"></i></button>
                        <h2>Tạo nhóm</h2>
                    </div>
                    <div className='create-chat-group__main'>
                        <h3>Tên nhóm</h3>
                        <input type="text" name="room_name" id='room_name' placeholder="Nhập tên nhóm"/>
                        <h3>Mời thêm bạn vào trò chuyện</h3>
                        <input type="text" name="find_friend" placeholder='Tìm kiếm bằng tên' />
                    </div>
                    <div className='create-chat-group__footer'>
                        <Button variant="contained">Hủy</Button>
                        <Button variant="contained" color="primary" type='submit'>Tạo nhóm</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateChatRoomModal;