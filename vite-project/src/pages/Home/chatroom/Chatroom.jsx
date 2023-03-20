import React from 'react'
import {ChatEngine} from 'react-chat-engine'; 


const Chatroom = () => {
  // const user = "unesh";
  // const userPassword = "unesh";
  const data = window.localStorage.getItem('USERNAME');
  const Status = JSON.parse(data)
  return (
    <ChatEngine
      height="100vh"
      projectID="01a1f814-6792-49a6-acf0-2485658a8ed0"
      userName= {Status}
      userSecret={Status}
    
    />
  )
}

export default Chatroom