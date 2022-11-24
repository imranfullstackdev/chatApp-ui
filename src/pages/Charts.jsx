import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../component/Chat";
import Contacts from "../component/Contacts";
import Welcome from "../component/Welcome";
import { io } from "socket.io-client";

const Charts = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contact, SetContact] = useState([]);
  const [currentUser, SetCurrentuser] = useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("Chat-User-data")) {
      navigate("/Login");
    } else {
      SetCurrentuser(JSON.parse(localStorage.getItem("Chat-User-data")));
      setIsLoading(true);
    }
  }, []);

  const allUser = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const alluser = await axios(
          `https://chat-app-api-zeta.vercel.app/allChats/${currentUser._id}`
        );
        SetContact(alluser.data.allChats);
      } else {
        navigate("/setAvatar");
      }
    }
  };
  useEffect(() => {
    allUser();
  }, [currentUser]);
  const chatmessage = async () => {
    if (currentUser) {
      socket.current = io(`https://chat-app-api-zeta.vercel.app/`);
      socket.current.emit("add-user", currentUser._id);
    }
  };
 


  const handleChange = (chat) => {
    setcurrentChat(chat);
  };
  useEffect(()=>{
    chatmessage()
  },[currentUser])
  return (
    <>
      <div className="mainChat">
        <div className="chatheader">
          <Contacts
            contact={contact}
            currentUser={currentUser}
            changeChat={handleChange}
          />

          {isloading && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <Chat currentUser={currentUser} currentChat={currentChat}  socket={socket}/>
          )}
        </div>
      </div>
    </>
  );
};

export default Charts;
