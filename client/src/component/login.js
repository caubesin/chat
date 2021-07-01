import React, {useState} from "react";
import "../css/login.css";
import form_img from "../assets/mobile-development-banner.svg";
import appNameImg from "../assets/app-name.png";
import $ from 'jquery';
import Cookie from 'js-cookie';
import qs from 'qs';
import sendReq from '../helper/sendReq';
import {useDispatch} from "react-redux";
import { addServerMessage, setIsAuthenticated } from "../features/statusSlice";
import {setUser,setLoadMessage, setRoom} from "../features/messageSlice";
import { CircularProgress, Button } from '@material-ui/core';
import Message from "./serverMessage";
import { useHistory } from "react-router-dom";




const Login = () => {
    const history = useHistory();
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const setData = (res) => {
        if(res.data.isAuthenticated === false) {
            return dispatch(addServerMessage(res.data.message));
        }
        return Promise.all([ 
            dispatch(setUser(res.data.user)),
            dispatch(setLoadMessage(true)),
            dispatch(setIsAuthenticated(res.data.isAuthenticated)),
            dispatch(setRoom(res.data.chatroom)),
            dispatch(setLoadMessage(false)),
        ])
    }
    const handleSignIn = () => {
        dispatch(addServerMessage({
            type: 'error',
            mess: null
        }));
        history.push('/signup');
    }
    const handleClick = () => {
        if($("#username").val() === "") {
            dispatch(addServerMessage({
                type: 'error',
                mess: 'Tên tài khoản không được trống !'
            }));
            return;
        }
        if($("#password").val() === '') {
            dispatch(addServerMessage({
                type: 'error',
                mess: 'Mật khẩu không được trống !'
            }));
            return;
        }
        /*if ($('#remember').is(':checked')) {
            let username = $('#username').val();
            let password = $('#password').val();
            // set cookies to expire in 14 days
            Cookie.set('username', username, { expires: 14 });
            Cookie.set('password', password, { expires: 14 });
            Cookie.set('remember', true, { expires: 14 });
        } else {
            // reset cookies
            Cookie.set('username', null);
            Cookie.set('password', null);
            Cookie.set('remember', null);
        }*/
        setLoading(true);
        const configReq = {
            method: 'post',
            url: '/authenticate',
            header: 'application/x-www-form-urlencoded;charset=utf-8',
            data: qs.stringify({
                "username": `${String($('#username').val())}`,
                "password": `${String($('#password').val())}`
            })
        }
        setTimeout(async () => {
            const res = await sendReq(configReq);
            await setData(res);
            setLoading(false);
            if(res.data.isAuthenticated) {
                history.push('/chat');
            }
        }, 2000)
    } 
    return(
        <>
            <div className="login-form">
                <div className="main-login">
                    <div className="form-img">
                        <img src={form_img} alt="Form Img" />
                    </div>
                    <div className="main-login-form">
                        <div className="container">
                            <img src={appNameImg} alt="App Name"/>
                            <p>Đăng nhập</p>
                            <Message></Message>
                            <div className="form">
                                <label htmlFor="username">Tên tài khoản</label>
                                <input type="text" name="username" id="username" placeholder="Tên tài khoản" autoComplete='off'/>
                                <label htmlFor="password">Mật khẩu</label>
                                <input type="password" name="password" id="password" placeholder="Mật khẩu" />
                                <div className="extend-log">
                                    <div className="remember-checkbox">
                                        <input type="checkbox" name="Remember" id="remember"/>
                                        <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                                    </div>
                                    <p>Quên mật khẩu ?</p>
                                </div>
                                <Button variant="contained" color="primary" onClick={handleClick} className="MuiBtn">{loading ? <CircularProgress/> : "Đăng nhập"}</Button>
                                <div className="other-login">
                                    <div className="line"></div>
                                    <p>Hoặc đăng nhập với</p>
                                </div>
                                <Button variant="contained" id="facebook-login-button" className='MuiBtn'>
                                    <div className="facebook-icon">
                                        <i className="fab fa-facebook-f"></i>
                                    </div>
                                    Login with Facebook
                                </Button>
                                <p>Không có tài khoản ? <span onClick={handleSignIn}>Đăng ký</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;