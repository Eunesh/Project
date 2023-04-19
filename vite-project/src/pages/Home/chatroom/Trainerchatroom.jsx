import React from "react";
import "./Chatroom.css";
import { ChatEngine } from "react-chat-engine";
import { MessageFormSocial } from "react-chat-engine";

const Trainerchatroom = () => {
  return (
    <ChatEngine
      height="100vh"
      projectID="b4037c1a-ae4b-4d8e-b09a-66ee38ebd4d9"
      // userName={userData}
      // userSecret={userData}
      userName="Trainer"
      userSecret="Trainer"
      renderNewMessageForm={() => <MessageFormSocial />}
    />
  );
};

export default Trainerchatroom;
