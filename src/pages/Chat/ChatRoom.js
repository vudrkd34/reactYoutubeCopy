import React, { useState, useEffect ,useRef} from 'react'
import axios from 'axios';
import style from '../../style.module.css'
import io from "socket.io-client";
import ImageDropzone from './ImageDropZone'


const socket = io.connect("http://localhost:3001");


function ChatRoom(props) {


    const [selectedImage, setSelectedImage] = useState(null);
    const [name,setName] = useState("");
    const [msg,setMsg] = useState("");
    const [messageList,setMessageList] = useState([]);
    const [testData,setTestData] = useState("");

    const messageDiv = useRef();

    const [isLogin,setIsLogin] = useState("");
    const [sessionNickName,setSessNickName] = useState("");

    const [preview,setPreview] = useState('/assets/test.png');
    const [image,setImage] = useState(null);
  



    


    useEffect(() => {
      _getLoginExsit();
      setTestData("일단 TEST 로 set");

      socket.on("receive message", (message) => {   //"receive message"라는 이벤트 받음(2)
        
        setMessageList([...messageList, message]);
  
        //setMessageList((prevMessages) => [...prevMessages, message]);

        // 2초 뒤에 마지막으로 추가된 아이템 제거

        
        setTimeout(() => {
          setMessageList((prevMessages) => prevMessages.slice(1));
        }, 1000);

      });

      return () => {
        socket.off('receive message');
      };

      
    },[]);

    const handleValueChange = (newValue) => {

      socket.emit("send image", {		//"send message"라는 이벤트 발생 (1)
        name: sessionNickName,
        msg: newValue, 
      });
      //
    }

    useEffect(() => {

      socket.on("receive image", (message) => {   //"receive message"라는 이벤트 받음(2)
        
        console.log("message",message);

        setSelectedImage(message.msg);

        
        setTimeout(() => {
          setSelectedImage(null);
        }, 1000);

      });

      return () => {
        socket.off('receive message');
      };


    },); //


    async function _getLoginExsit() {
      const res = await axios.get('/auth');
      console.log("채팅 로그인 ");
      if(!res.data.isLogin){alert('로그인을 먼저 해주시기 바랍니다.'); window.location.href='/login'; return false;}

      setIsLogin(res.data.isLogin)
      setSessNickName(res.data.userId)
    }
    


    function sendMsg(e) {
        e.preventDefault();
        socket.emit("send message", {		//"send message"라는 이벤트 발생 (1)
          name: sessionNickName,
          msg: msg, 
        });
        
        setMsg("");
      };


  
    
    messageList.forEach(element => {
      console.log(element.name)
      console.log(element.msg)
    });
    return(
      <div>
        <section className="chat_list">
          {selectedImage && (
                  <div>
                      <img src={selectedImage} alt="Selected Preview" style={{ width: '300px', height: 'auto' }} />
                  </div>
           )}
          {messageList.map((item) => (
            <div className="messagelist" ref={messageDiv} key={item.id}>
              <p className="username">{item.name}</p>
              <p className="msg_text">{item.msg}</p>
            </div>
          ))}
        </section>

        <form className="chat_con" onSubmit={sendMsg}>
          <div className="chat_inputs">
            <div className='img_wrap'> 
                <img src= {preview} width={200} height={150} 
                 alt='이미지' className='img_box' />
                 <br/> 
                 
                 {/* <input multiple={false} name='imageurl' /> */}

                 <ImageDropzone onValueChange={handleValueChange} />
                 
            </div>
            <textarea
              
              onChange={event => {setMsg(event.target.value)}}
              width="200px;"
              name="msg"
              id="msg"
              placeholder="메세지내용"
            >

              {msg}
            </textarea>
          </div>
          <button className="chat_button" type="submit">
            보내기
            
          </button>
        </form>
      </div>
    )
}


export default ChatRoom; 
