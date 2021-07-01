import React from "react";
import "../css/sideBar.css";
import avt from "../assets/avt.png";

const SideBar = (props) => {
    return(
        <>
            <div className = "top-side-bar">
                <div className = "self-avt">
                    <div className="self-avt-img">
                        <img src={avt} alt="Avatar" />
                        <div className="self-avt-status">
                        </div>
                    </div>
                </div>
                <ul className = "side-bar-button">
                    <li title="Message"><i className="fal fa-comment-lines"></i></li>
                    <li title="Friend"><i className="fal fa-user-friends"></i></li>
                    <li title="Notice"><i className="fal fa-bell"></i></li>
                    <li title="To Do"><i className="fal fa-list-ul"></i></li>
                    <li title="Meet Room"><i className="fal fa-video"></i></li>
                </ul>
            </div>
            <div className = "bottom-side-bar">
                <ul className = "side-bar-button">
                    <li title="File Transfer"><i className="fal fa-file-import"></i></li>
                    <li title="Tick"><i className="fal fa-star"></i></li>
                    <li title="Setting"><i className="fal fa-cog"></i></li>
                </ul>
            </div>
        </>
    )
}

export default SideBar;