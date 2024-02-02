import React, { useState, useEffect } from 'react'
import style from './style.module.css'
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';


function App(props) {
  const [state,setState] = useState("");
  const [listData,setListData] = useState([{
    id : '',
    title : '',
    url : '',
    file_name : '',
    file_path : ''
  }])
  
  useEffect(() => {
    _getData();
    _getHello();
    
  }, []);

  async function _getHello() {
    const res = await axios.get('/hello');
    setState(res.data.hello );
  }

  async function _getData() {
    console.log("getData 시작");
    const res = await axios.get('/test_data');
    console.log("getData 안오냐");
    console.log(res.data);
    setListData(res.data);
    
  }
 
  function goHome() {
    window.location.href = "/";
  }
  const onclickHandler = () => {console.log('준비중 .....?? ')}

  const serverConnect = () => {console.log('')}
  
  //ingchiken ingchiken 


  return (
    <>
    <section id="topMenu"> 
    {/* <ul style={{listStyleType:"none"}}> */}
      <ul className={style.topMenuUI}>
        <li className={style.topMenuLi} onClick={goHome}>Home</li>
        <li className={style.topMenuLi} onClick={onclickHandler}>??</li>
      </ul>
    </section>
    <section id="main" style={{display:"flex", justifyContent:"center"}}>

      {listData.map((item)=>(
        <div style={{marginRight:"50px"}}>
          <video controls loop muted playsInline width="400px" height="200px"><source src={item.file_path} type='video/mp4'></source></video>
          <div key={item.id} style={{textAlign:"center"}}>{item.title}</div>
        </div>


      ))}

    </section>
    </>
  );
}

export default App; 
