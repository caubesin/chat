import React, {useEffect} from 'react';
import '../css/app.css';
import SideBar from './sideBar';
import ChatBox from "./chatBox";
import ChatRoom from "./chatRoom";
import {socket} from '../app/socketIO' 

function Main() {
  useEffect(() => {
    socket.connect();
  },[])
  return (
    <div className="App">
      <div className="side-bar">
        <SideBar></SideBar>
      </div>
      <div className = "main">
        <div className="main-header">
          
        </div>
        <div className = "main-box">
          <div className = "chat-room">
            <ChatRoom></ChatRoom>
          </div>
          <div className = "chat">
            <div className = "chat-box">
              <ChatBox></ChatBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;