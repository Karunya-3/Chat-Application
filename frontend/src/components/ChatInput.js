import React,{useState} from "react";
import "./ChatInput.css";

const ChatInput=({onSendMessage,onTyping})=>{
  const [message,setMessage]=React.useState("");
  const [userName,setUserName]=React.useState("");
  const handleSend=()=>{
    if(message.trim()&&userName.trim()){
      onSendMessage(message,userName);
      setMessage("");
    }
  }
  const handlePressKey=(e)=>{
    if(e.key==="Enter" && !e.shiftKey){
      e.preventDefault();
      handleSend();
    }
  }
  const handleMessageChange=(e)=>{
    setMessage(e.target.value);
    if(userName.trim()){
      onTyping(userName);
    }
  }
  return (
     <div className="chat-input-container">
      <input
        type="text"
        className="username-input"
        placeholder="Your name..."
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        className="message-input"
        placeholder="Type a message..."
        value={message}
        onChange={handleMessageChange}
        onKeyPress={handlePressKey}
      />
      <button
        className="send-button"
        onClick={handleSend}
        disabled={!message.trim() || !userName.trim()}
      >
        Send
      </button>
    </div>
  );
}
export default ChatInput;