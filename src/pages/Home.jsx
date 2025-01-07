import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Home() {
    const [listData,setListData] = useState([{
        id : '',
        title : '',
        url : '',
        file_name : '',
        file_path : ''
      }])

      useEffect(() => {
        //_getData();
        
        
      }, []);


      async function _getData() {
        console.log("getData 시작");
        const res = await axios.get('/test_data');
        console.log("getData 안오냐");
        console.log(res.data);
        setListData(res.data);
        
      }

  return (
    <>
        <section id="main" style={{display:"flex", justifyContent:"center"}}>
        {listData.map((item)=>(
        <div style={{marginRight:"50px"}}>
            <video controls loop muted playsInline width="400px" height="200px"><source src={item.file_path} type='video/mp4'></source></video>
            <div key={item.id} style={{textAlign:"center"}}>{item.title}</div>
        </div>


        ))}
        </section>
    
    </>

  )
}

export default Home;