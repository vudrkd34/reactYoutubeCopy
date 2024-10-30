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



function App(props) {
  const [state,setState] = useState("");
  const [isLogin,setIsLogin] = useState("");
  const [sessionNickName,setSessNickName] = useState("");


  
  useEffect(() => {

    _getHello();
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
  }

  Session.set("nickname","test");
  /**
   * 
    슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.
    시발럼아.슈숙.슉.슉.슉.슉.슉.슉.슉.슉.
    슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.
    슈숙.슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.
    슉.슈숙.슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.
    슉.슉.슉.슈숙.슉.슉.슉.슈숙.슉.슉.슉.
    슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.
    슈숙.슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.
    슈숙.슉.슉.슉.슉.슈슉.슈슉.슈슉.슈슉.
    슈슉.슈슉.슈슉.시.시발롬아.슈숙.시.
    시.시.시.슈슉 슈숙.슈숙.시.시.시.시.
    시.슈슉 슈숙.슈숙.슈슉 슈숙.슈슉.슈슉.
    슉.슈슉 슈숙.슈숙.슈숙.시.시.시.시.시.
    슈슉 슈숙.슉.슈슉 슈숙.슈숙.시.시.시.
    시.슈슉 슈숙.슈슉.슈슉.슈슉.시.시.
    슈슉 슈숙.슈숙.슈숙.슈숙.슈숙.슈숙.
    시.시.시.슈슉 슈숙.슈슉.슈슉.슈슉.슉.
    슉.슉.슉.슉.슈슉 슈숙.슈슉.슈슉.
    슈슉 슈숙.슈숙.슈숙.슈숙.슈숙.슈숙.슉.
    슈슉 슈숙.슈슉.슈슉.슈슉.시.시.시.시.
    시.슈슉 슈숙.슈슉.슈슉.시.슈슉 슈숙.
    슈숙.슈숙.슈숙.슈숙.시.슈슉 슈숙.슈슉.
    슈슉.슉.슉.슉.슉.슉.슉.슉.슉.슈슉 슈숙.
    슈숙.슈슉 슈숙.슈슉.슈슉.슈슉.슉.슉.
    슈슉 슈숙.슈숙.슈슉 슈숙.슈숙.슈숙.
    슈숙.시.시.시.시.시.시.시.슈슉 슈숙.
    슈슉.슈슉.슈슉.슈슉.슈슉 슈숙.슈숙.
    슈슉 슈숙.슈숙.슈숙.슈숙.슈슉 슈숙.
    슈슉.슈슉.슈슉.슈슉.슉.슈슉 슈숙.슈숙.
    슉.슉.슉.슉.슉.슉.슉.슉.슉.슉.슈슉 슈숙.
    슈숙.슈숙.슈숙.슉.슉.슉.슉.슉.슉.슉.
    슉.슈슉 슈숙.슈슉.슈슉.슈슉.슈슉.시.
    슈슉 슈숙.슈숙.슈숙.슈숙.슈숙.슈숙.슉.
    슉.슈슉 슈숙.슈슉.슈슉.슈슉.시.시.시.
    시.슈슉 슈숙.슈숙.슈슉 슈숙.슈슉.슈슉.
    슈슉.시.슈슉 슈숙.슈숙.슈숙.슉.슉.슉.
    슉.슉.슉.슉.슉.슉.슉.슉.슈슉 슈숙.슈슉.
    시.시.시.시.시.시.시.시.시.슈슉 슈숙.
    슈슉.슈슉 슈숙.슈숙.슉.슉.슉.슉.슉.슉.
    슉.슈슉 슈숙.슈숙.시.시.시.슈슉 슈숙.
    슈슉.슈슉.슉.슈슉 슈숙.슈숙.슉.슉.슉.
    슉.슈슉 슈숙.슈숙.슈숙.슈숙.슈숙.슉.슉.
    슉.슉.슈슉 슈숙.슈슉.슈슉.슈슉.슈슉.
    슈슉.슈슉 슈숙.슈숙.슈숙.슈숙.슈숙.
    슈숙.슉.슉.슈슉 슈숙.슈슉.슉.슈슉 슈숙.
    슈슉.슈슉.슈슉.슈슉.시.슈슉 슈숙.슈숙.
    슈숙.슈숙.슈숙.슈숙.슉.슈슉 슈숙.시.시.
    시.슈슉 슈숙.슈슉.슈슉.슈슉.슈슉.슈슉.
    슈슉 슈숙.슈숙.슈숙.슈숙.슈숙.슈숙.슉.
    슉.슉.슈슉 슈숙.슈슉.슈슉.슈슉.슈슉 슈숙.
    슈숙.슈숙.슈숙.슈숙.시.시.슈슉 슈숙.
   * 
   * 
   */

  /** 죽창죽창죽창죽창죽창죽창죽창죽창 
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창 
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창 
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창 
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창
   *  죽창죽창죽창죽창죽창죽창죽창죽창 
   *  
      죽창죽창죽창죽창죽창죽창죽창죽창 **/

 
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
        <Link to="/">Home</Link>
        <Link to="/???" onClick={onclickHandler}>???</Link>
        <Link to="/chat" >ChatTest</Link>
      </ul>
      <div className="myInfoArea">
        { isLogin ? <div> {sessionNickName}(로그아웃) </div> : <Link to="/login">로그인</Link>}
        
      </div>
    </section>
    

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/chat' element={<ChatRoom />} />
    </Routes>

    </>
  );
}

export default App; 
