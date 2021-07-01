import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import appNameImg from "../assets/app-name.png";
import { CircularProgress, Button, TextField, FormControlLabel, Checkbox, Popover } from '@material-ui/core';
import $ from 'jquery';
import "../css/signup.css";
import sendReq from '../helper/sendReq';
import qs from 'qs';
import FormImg from '../assets/mobile-development-banner.svg';
import {useDispatch} from "react-redux";
import { addServerMessage} from "../features/statusSlice";
import Message from "./serverMessage";

const Signup = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const handleLogin = () => {
        history.push('/login')
    }
    const handleClick = async () => {
        if($('#username').val() === "") {
            dispatch(addServerMessage({
                type: 'error',
                mess: 'Tên đăng nhập không được trống !'
            }));
            return;
        }
        const validUsername = new RegExp('^[a-z0-9]{4,16}$');
        if(!validUsername.test($('#username').val())) {
            dispatch(addServerMessage({
                type: 'error',
                mess: 'Tên đăng nhập phải bắt đầu bằng ký tự thường và có 4 đến 16 ký tự !'
            }));
            return;
        }
        if($('#password').val() === '') {
            dispatch(addServerMessage({
                type: 'error',
                mess: 'Mật khẩu không được trống !'
            }));
            return;
        }
        /*const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(!validPassword.test($('#password').val())) {
            dispatch(addServerMessage({
                type: 'error',
                mess: 'Mật khẩu phải có tối thiểu 8 ký tự, tối thiểu một ký tự chữ và số !'
            }));
            return;
        }*/
        if($('#password').val() !== $('#re_pass').val()) {
            dispatch(addServerMessage({
                type: 'error',
                mess: 'Nhập lại mật khẩu không trùng khớp !'
            }));
            return;
        }
        if(!$('#agree').is(':checked')) {
            dispatch(addServerMessage({
                type: 'error',
                mess: 'Đồng ý với các điểu khoản của chúng tôi để tiếp tục !'
            }));
            return;
        }
        setLoading(true);
        const configReq = {
            method: 'post',
            url: '/user/signup',
            header: "application/x-www-form-urlencoded;charset=utf-8",
            data: qs.stringify({
                "username": `${String($('#username').val())}`,
                "password": `${String($('#password').val())}`,
                "date": `${String($('#date').val())}`
            })
        }
        setTimeout(async () => {
            const res = await sendReq(configReq);
            console.log(res);
            if(res.data.status === "Success") {
                dispatch(addServerMessage({
                    type: 'success',
                    mess: 'Successful create account !'
                }));
                $('#username').val('');
                $('#password').val('');
                $('#re_pass').val('');
                $('#date').val('2000-01-01');
            }
            else {
                dispatch(addServerMessage({
                    type: res.data.message.type,
                    mess: res.data.message.mess
                }));
            }
            setLoading(false);
        }, 2000)
    }
    const inputClick = (e) => {
        if(e.target.name === 'username') {
            dispatch(addServerMessage({
                type: 'info',
                mess: "Tên đăng nhập bắt đầu bằng ký tự thường và có 4 đến 16 ký tự !"
            }));
        }
        else if(e.target.name === 'password') {
            dispatch(addServerMessage({
                type: 'info',
                mess: "Mật khẩu có tối thiểu 8 ký tự, tối thiểu một ký tự chữ và số !"
            }));
        }
        else {
            dispatch(addServerMessage({
                type: 'error',
                mess: null
            }));
        }
    }
    return(
        <>
            <div className="login-form">
                <div className="main-login reverse">
                    <div className="form-img sign-form-img">
                        <img src={FormImg} alt="Form Img" />
                    </div>
                    <div className="main-login-form">
                        <div className="container">
                            <img src={appNameImg} alt="App Name"/>
                            <p>Đăng ký tài khoản</p>
                            <Message></Message>
                            <div className="form">
                                <label htmlFor="username">Tên đăng nhập</label>
                                <input type="text" name="username" id="username" placeholder="Tên đăng nhập" autoComplete='off' onClick={inputClick}/>
                                <label htmlFor="password">Mật khẩu</label>
                                <input type="password" name="password" id="password" placeholder="Mật khẩu" onClick={inputClick}/>
                                <label htmlFor="re_pass">Nhập lại mật khẩu</label>
                                <input type="password" name="re_pass" id="re_pass" placeholder="Nhập lại mật khẩu" onClick={inputClick}/>
                                <label htmlFor="re_pass">Ngày sinh</label>
                                <TextField id="date" type="date" defaultValue="2000-01-01" name='date' onClick={inputClick}/>
                                <div className="extend-signup">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="checkedB"
                                            color="primary"
                                            id="agree"
                                        />
                                    }
                                    label="Đồng ý với các điểu khoản cảu chúng tôi"
                                />
                                </div>
                                <Button variant="contained" color="primary" onClick={handleClick} className="MuiBtn">{loading ? <CircularProgress/> : "Đăng ký"}</Button>
                                <p>Đã có tài khoản ? <span onClick={handleLogin}>Đăng nhập</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;