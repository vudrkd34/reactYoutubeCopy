import React, { useState, useEffect } from 'react'
import axios from 'axios';
function Login() {
  const [id,setId] = useState("");
  const [password,setPassword] = useState("");



  async function doLogin() {
    console.log("로그인 시작")
    const res = await axios.post('/login',{
      userId : id, 
      userPassword : password
    });

    console.log(res.data.isLogin);
    
    if(res.data.isLogin == 'True'){ //로그인 성공
      window.location.href= '/home';
    }

    
    
    
  }

    return (
        <>
        <div>로그인</div>
        <input type='text' name="userId" onChange={event => {setId(event.target.value)}} />
        <input type='password' name="userPassword" onChange={event => {setPassword(event.target.value)}} />
        <button type='button' onClick={doLogin} >로그인</button>
        
        </>
    
      )
}

export default Login;