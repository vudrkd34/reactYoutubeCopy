import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import io from "socket.io-client";
import ImageDropzone from './ImageDropZone';
import Session from 'react-session-api';
import style from '../../style.module.css';

const socket = io.connect("http://192.168.0.71:3001");

function ChatRoom(props) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("");
    const [msgFloat, setMsgFloat] = useState("left");
    const [messageList, setMessageList] = useState([]);
    const [testData, setTestData] = useState("");
    const messageDiv = useRef();
    const [isLogin, setIsLogin] = useState("");
    const [sessionNickName, setSessNickName] = useState("");
    const [preview, setPreview] = useState('/assets/test.png');
    const [image, setImage] = useState(null);

    useEffect(() => {
        _getLoginExsit();
        setTestData("일단 TEST 로 set");

        

        const handleReceiveMessage = (message) => {
            setMessageList((prevMessages) => [...prevMessages, message]);
        };

        socket.on("receive message", (message) => {   //"receive message"라는 이벤트 받음(2)
        
        //setMessageList([...messageList, message]);
  
        setMessageList((prevMessages) => [...prevMessages, message]);

        // 2초 뒤에 마지막으로 추가된 아이템 제거
        
        setTimeout(() => {
          setMessageList((prevMessages) => prevMessages.slice(1));
        }, 1000);

      });

        return () => {
            socket.off('receive message', handleReceiveMessage);
        };
    }, []);


    const handleValueChange = (newValue) => {
        sendImg(newValue);
    };

    const sendImg = (imageVal) => {

        socket.emit("send message", {
            name: Session.get("NickName"),
            image: imageVal,
        });
    };

    const _getLoginExsit = async () => {
        try {
            const res = await axios.get('/auth');
            if (!res.data.isLogin) {
                alert('로그인을 먼저 해주시기 바랍니다.');
                window.location.href = '/login';
                return;
            }
            setIsLogin(res.data.isLogin);
            setSessNickName(res.data.userId);
        } catch (error) {
            console.error("Failed to get login status:", error);
        }
    };

    const sendMsg = (e) => {
        e.preventDefault();

        socket.emit("send message", {
            name: sessionNickName,
            msg: msg,
        });
        setMsg("");
    };

    return (
        <div>
            <section className="chat_list" style={{display:'flex' , flexDirection : 'column'}}> 
                {selectedImage && (
                    <div>
                        <img src={selectedImage} alt="Selected Preview" style={{ width: '300px', height: 'auto' }} />
                    </div>
                )}
                {messageList.map((item, index) => (

                    
                    <div className="messagelist" ref={messageDiv} key={index} style={ item.name === Session.get("NickName") ? {  marginLeft: 'auto'} :  {marginRight: 'auto'}}>

                        <p className="username">{item.name}</p>
                        <p className="msg_text">{item.msg}</p>
                        {item.image && (
                            <p className="msg_image">
                                <img src={item.image} alt="Selected Preview" style={{ width: '300px', height: 'auto' , float: msgFloat }} />
                            </p>
                        )}
                    </div>
                ))}
            </section>
            <form className="chat_con" onSubmit={sendMsg}>
                <div className="chat_inputs">
                    <div className='img_wrap'>
                        <ImageDropzone onValueChange={handleValueChange} />
                    </div>
                    <input
                        type='text'
                        value={msg}
                        onChange={event => setMsg(event.target.value)}
                        width="200px;"
                        name="msg"
                        id="msg"
                        placeholder="메세지내용"
                    />
                </div>
                <button className="chat_button" type="submit">보내기</button>
            </form>
        </div>
    );
}

export default ChatRoom;
