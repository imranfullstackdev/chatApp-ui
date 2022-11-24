import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4, v4 } from "uuid";

const Chat = ({ currentChat, socket }) => {
  const [message, SetMessage] = useState([]);
  const [ArrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const allMessages = async () => {
    const data = await JSON.parse(localStorage.getItem("Chat-User-data"));
    if (currentChat) {
      const response = await axios.post(
        `https://chat-app-api-zeta.vercel.app/messages/addAllMessages`,
        {
          from: data._id,
          to: currentChat._id,
        }
      );
      // debugger;
      SetMessage(response.data);
    }
  };
  useEffect(() => {
    allMessages();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("Chat-User-data"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("Chat-User-data"));
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post("https://chat-app-api-zeta.vercel.app/messages/addMessages", {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...message];
    msgs.push({ fromSelf: true, message: msg });
    SetMessage(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);
  useEffect(() => {
    if (ArrivalMessage) {
      let deep = [...message, ArrivalMessage];
      SetMessage(deep);
    }
  }, [ArrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaiviour: "smooth" });
  }, [message]);

  return (
    <>
      {currentChat && (
        <>
          <div className="chatContainer">
            <div className="chatheader">
              <div className="user-details">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt=""
                  />
                  <div className="username">
                    <h3>{currentChat.name}</h3>
                  </div>
                </div>
              </div>
              <Logout />
            </div>
            <div className="chat-messages">
              {message.map((message) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div
                      className={`message ${
                        message.fromSelf ? "sended" : "recieved"
                      }`}
                    >
                      <div className="content ">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="ChatInputdiv">
              <ChatInput handleSendMsg={handleSendMsg} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Chat;
