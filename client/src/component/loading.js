import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import {useDispatch} from "react-redux";
import {setIsAuthenticated } from "../features/statusSlice";
import {setUser,setLoadMessage, setRoom} from "../features/messageSlice";
import sendReq from '../helper/sendReq';

import { useHistory } from "react-router-dom";

const Loading = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const setData = (res) =>{
        return Promise.all([ 
          dispatch(setUser(res.data.user)),
          dispatch(setLoadMessage(true)),
          dispatch(setIsAuthenticated(res.data.isAuthenticated)),
          dispatch(setRoom(res.data.chatroom)),
          dispatch(setLoadMessage(false))
        ])
      }
    useEffect( async() => {
        const configReq = {
            method: 'get',
            url : "/chat",
            header: "Content-Type: text/plain; charset=utf-8",
            data: ""
        }
        const res = await sendReq(configReq);
        if(res.data.isAuthenticated) {
            await setData(res);
            history.push('/chat');
        }
        else {
            history.push('/login');
        }
    })
    return(
        <h1>Loading...</h1>
    )
}

export default Loading;