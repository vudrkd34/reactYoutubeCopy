import React from 'react'
import style from './style.module.css'
import { Routes, Route } from 'react-router-dom';



function App() {

  function goHome() {
    window.location.href = "/";
  }

  const onclickHandler = () => {console.log('준비중 .....??')}

  const serverConnect = () => {console.log('')}


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
