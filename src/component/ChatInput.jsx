import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

const ChatInput = ({handleSendMsg}) => {
  const [pickEmoji, setpickEmoji] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiPicker = () => {
    setpickEmoji(!pickEmoji);
  };
  const handleEmoji = (e, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message); 
    setMsg(message);
  };

  const sendChat=(e)=>{
    e.preventDefault()
    if(msg.length>0){
      handleSendMsg(msg)
      setMsg('')
    }
  }
  return (
    <>
      <div className="chatInputContainer">
        <div className="buttoncontainer">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPicker} />
            {pickEmoji && <Picker onEmojiClick={handleEmoji}  />}
          </div>
        </div>
        <div className="chatForm">
          <form onSubmit={((e)=>sendChat(e))}>
            <input
              type="text"
              placeholder="Enter Your Text Here"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button className="chatFormBtn" type="submit">
              <IoMdSend />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
