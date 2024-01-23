import React, { useState, useEffect } from 'react'
import style from './style.module.css'
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';


function App() {

  function goHome() {
    window.location.href = "/";
  }

  const onclickHandler = () => {console.log('준비중 .....??')}

  const serverConnect = () => {console.log('')}

  useEffect(() => {
    axios.get('/api/test')
      .then(res => console.log(res))
      .catch()
  })


  return (
    <>
    <section id="topMenu">
    {/* <ul style={{listStyleType:"none"}}> */}
    <ul className={style.topMenuUI}>
      <li className={style.topMenuLi} onClick={goHome}>Home</li>
      <li className={style.topMenuLi} onClick={onclickHandler}>??</li>
    </ul>
    </section>
    <section id="main">
      
    </section>
    </>
  );
}

export default App; 
