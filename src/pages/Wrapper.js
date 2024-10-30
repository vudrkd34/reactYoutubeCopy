import React from 'react';

function Wrapper({children}) {
  const style = {
    border: '2px solid black',
    padding: '16px',
    //display: 'none',
  };
  return (
    <div style={style}>
        {children}
    </div>
  )
}

export default Wrapper;