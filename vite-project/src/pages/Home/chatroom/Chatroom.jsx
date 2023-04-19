import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChatEngine } from "react-chat-engine";
import { MessageFormSocial } from "react-chat-engine";
import "./Chatroom.css";

const Chatroom = () => {
  const [userName, setUserName] = useState("");
  const [member, setMember] = useState();

  const getMembership = async () => {
    try {
      const res = await axios.get("/membership");
      setUserName(res.data.name);
      setMember(res.data.isPaid);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(userName);
  console.log(member);

  useEffect(() => {
    getMembership();
  }, []);

  if (!userName) {
    // Render a loading indicator until userData is set
    return <div>Loading...</div>;
  }

  return (
    <div className="background">
      <div className="shadow">
        {member ? (
          <ChatEngine
            height="calc(100vh - 80px)"
            projectID="b4037c1a-ae4b-4d8e-b09a-66ee38ebd4d9"
            userName={userName}
            userSecret={userName}
            renderNewMessageForm={() => <MessageFormSocial />}
          />
        ) : (
          <div className="px-96 py-44"> Sorry You are not a member yet </div>
        )}
      </div>
    </div>
  );
};

export default Chatroom;
