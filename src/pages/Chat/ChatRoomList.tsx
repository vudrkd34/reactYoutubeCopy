import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import io from "socket.io-client";
import ImageDropzone from './ImageDropZone';
import Session from 'react-session-api';
import style from '../../style.module.css';
import { Link } from 'react-router-dom';



function ChatRoomList(props : any) {

    const [chatRoomList, setChatRoomList] = useState<any>([]);



    useEffect(() => {
        
        _getRoomList();

    }, []);


    const _getRoomList = async () => {
        try {
            
            const res = await axios.get('/chatRoomList');

            res.data.forEach((value: { _id: string; },key: string,mapObj: any) => console.log(key + ' , '+ value._id));



            setChatRoomList(res.data);

        } catch (error) {
            console.error("Failed to get login status:", error);
        }
    };

    function joinRoom(_id: any) {
        console.log("join : "+ _id);
    }


    return (
        <div>
            <form className="chat_con">
                {chatRoomList.map((item : any, index : number) => (
                    <Link to="/chatRoom" state={{roomId : item._id}}>
                    <div onClick={() => joinRoom(item._id)}>
                        <p className="chatTitle">
                            {item.title} &nbsp;&nbsp;&nbsp;
                            {item.passwordExist === true ? "비밀번호 있음" : "비번 없다" }
                        </p>
                    </div>
                    </Link>
                ))}

            </form>
        </div>
    );
}

export default ChatRoomList;
