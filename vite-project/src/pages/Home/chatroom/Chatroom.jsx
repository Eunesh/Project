import React, {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import axios from "axios";
import {ChatEngine} from 'react-chat-engine'; 
import {MessageFormSocial} from 'react-chat-engine'; 
import './Chatroom.css'
import { PrettyChatWindow } from 'react-chat-engine-pretty';


const Chatroom = () => {
  const [userData, setUserData] = useState("");

  const getMembership = async () => {
    try {
      const res = await axios.get("/membership");
      setUserData(res.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMembership();
  }, []);

  // const {isLoading, logindata}= useQuery('userData', async()=>{
  //   const response = await axios.get("/membership");
  //   return response;
  // })

  console.log(userData);
 


  // console.log(logindata);
  if (!userData) {
    // Render a loading indicator until userData is set
    return <div>Loading...</div>;
  }

  return (
  // <div className='background'>
  //  <div className='shadow'>
  //   <ChatEngine
  //     height="calc(100vh - 80px)"
  //     projectID="01a1f814-6792-49a6-acf0-2485658a8ed0"
  //     userName={userData}
  //     userSecret={userData}
  //     // userName="unesh"
  //     // userSecret="unesh"
  //     renderNewMessageForm={()=><MessageFormSocial/>}
  //   />
  // </div>
  // </div>

    <PrettyChatWindow
      projectId="01a1f814-6792-49a6-acf0-2485658a8ed0"
      username=""
      secret=""
      style={{ height: '100%' }}
    />
  );
};


export default Chatroom