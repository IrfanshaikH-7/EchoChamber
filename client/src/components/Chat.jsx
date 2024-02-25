import React, { useState, useEffect, useRef } from "react";
import InputEmoji from "react-input-emoji";
import { IoSend } from "react-icons/io5";

const webSocket = new WebSocket("ws://localhost:3002");




const Chat = () => {


  webSocket.onmessage = function (event) {
    console.log(event);
  }


  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };



  const handleSendMessage = () => {
    // if (message.trim() !== "") {
    //   webSocket.send(JSON.stringify({
    //     message: 'main amar hu'
    //   }));
    //   setMessage("");
    // }
    setChats((prev) => ({...prev, message}))
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Scroll chat container to the bottom
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chats]);

  return (
    <main className="h-full w-full p-2 flex items-center justify-center">
      <section className="flex  h-[80%] w-[80%] border border-gray-700 rounded-md">
        <aside className="w-full flex-1 border-r border-gray-700 h-full ">
          {/* Groups the current user currenly in */}

        </aside>

        <div className="flex flex-col flex-[3] w-full border border-none shadow-md rounded px-4 py-2">
        <div ref={chatContainerRef} className="overflow-y-auto flex-grow">
          {chats.map((chat, index) => (
            <div className="chat chat-end">
              <div className="chat-bubble">{chat}</div>
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <InputEmoji
            value={message}
            onChange={setMessage}
            onKeyDown={handleKeyDown}
            shouldReturn
            placeholder="Type your message..."
            borderRadius={10}
            fontSize={20}
          />
          <button onClick={handleSendMessage} className="btn btn-square">
            <IoSend size={25} />
          </button>
        </div>
    </div>
      </section>
    
    </main>

  );
};

export default Chat;
