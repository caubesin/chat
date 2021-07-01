import React, {useLayoutEffect} from "react";
import sendReq from '../helper/sendReq';
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import {setIsAuthenticated, addServerMessage } from "../features/statusSlice";
import {setUser,setLoadMessage, setRoom} from "../features/messageSlice";

const ReRoute = ({component: Component,...rest}) => {
    const auth = useSelector(state => state.status.isAuthenticated);
    const location = useLocation();
    const dispatch = useDispatch();
    const sendReqToServer = async () => {
        const configReq = {
            method: 'get',
            url: '/chat',
            header: "Content-Type': 'text/plain; charset=utf-8",
            data: ""
        }
        const res = await sendReq(configReq);
        if(res.data.isAuthenticated) {
            dispatch(setUser(res.data.user));
            dispatch(setLoadMessage(true));
            dispatch(setIsAuthenticated(res.data.isAuthenticated));
            dispatch(setRoom(res.data.chatroom));
            dispatch(setLoadMessage(false));
        }
        else {
            dispatch(addServerMessage(res.data.message))
        }
    }
    useLayoutEffect(() => {
        sendReqToServer();
    })
    return (
        <Route {...rest}>
            {auth ? <Redirect to={{pathname: '/chat', state : {from: location}}} />
                : <Component></Component>
            }
        </Route>
    )
}

export default ReRoute;