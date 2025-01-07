import React, { useState, useEffect } from 'react'
import style from './style.module.css'
import { Routes, Route , Link} from 'react-router-dom';
import axios from 'axios';
import Wrapper from './pages/Wrapper';
import Hello from './pages/Hello';
import Home from './pages/Home';
import Login from './pages/MemberLogin';
import ChatRoom from './pages/Chat/ChatRoom';
import Session from 'react-session-api';
import VoiceChat from './pages/Chat/VoiceChat';



function App(props : any) {
  const [state,setState] = useState("");
  const [isLogin,setIsLogin] = useState("");
  const [sessionNickName,setSessNickName] = useState("");


  
  useEffect(() => {

    //_getHello();
    _getAuth();
    
  }, []);

  async function _getHello() {
    const res = await axios.get('/hello');
    setState(res.data.hello );
  }

  async function _getAuth() {
    const res = await axios.get('/auth');
    console.log("APPJS : " + res.data.isLogin );
    console.log("NickName : " + res.data.userId );
    setIsLogin(res.data.isLogin)
    setSessNickName(res.data.userId)


    Session.set("NickName",res.data.userId);

  }

 

 
  function goHome() {
    window.location.href = "/";
  }
  const onclickHandler = () => {console.log('준비중 .....?? ')}

  const serverConnect = () => {console.log('')}
  
  const goLogin = () => {}
  //ingchiken ingchiken 


  return (
    <>
    <section id="topMenu" style={{display:"flex"}} > 
    {/* <ul style={{listStyleType:"none"}}> */}
      <ul className={style.topMenuUI}>
        <li style={{marginRight:'10px'}}><Link to="/">Home</Link></li>
        <li style={{marginRight:'10px'}}><Link to="/???" onClick={onclickHandler}>???</Link></li>
        <li style={{marginRight:'10px'}}><Link to="/chat" >ChatTest</Link></li>
        <li style={{marginRight:'10px'}}><Link to="/voiceChat" >voiceChat</Link></li>
      </ul>
      <div className="myInfoArea">
        { isLogin ? <div> {sessionNickName}(로그아웃) </div> : <Link to="/login">로그인</Link>}
        
      </div>
    </section>
    

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/chat' element={<ChatRoom />} />
      <Route path='/voiceChat' element={<VoiceChat />} />
    </Routes>


    </>
  );
}

export default App; 
