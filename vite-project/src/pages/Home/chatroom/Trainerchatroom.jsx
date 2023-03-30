import React from "react";
import "./Chatroom.css";
import { ChatEngine } from "react-chat-engine";
import { MessageFormSocial } from "react-chat-engine";

const Trainerchatroom = () => {
  return (
    <ChatEngine
      height="100vh"
      projectID="01a1f814-6792-49a6-acf0-2485658a8ed0"
      // userName={userData}
      // userSecret={userData}
      userName="Trainer1"
      userSecret="12345"
      renderNewMessageForm={() => <MessageFormSocial />}
    />
  );
};

export default Trainerchatroom;
