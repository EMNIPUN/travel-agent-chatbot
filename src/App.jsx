import React, { useState, useEffect, useRef } from 'react';
import ChatBotIcon from './components/ChatBotIcon';
import SendingIcon from './components/SendingIcon';
import UseForm from './components/UseForm';
import ChatMessage from './components/ChatMessage';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  // Scroll to the latest message when chatHistory updates
  // This comment for testing git
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const generateChatBotResponse = async (history) => {

    const updateHistory = (text, imageUrl) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..." && msg.imageUrl !== "/icons/more.gif"), {role: "model", text, imageUrl}]);
    }

    history =  history.map(({role, text}) => ({role, parts: [{text}]}));

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        contents:  history
      })
    }

    try {

      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message) || "Something went wrong";
      const apiresponseText = data.candidates[0].content.parts[0].text.replace(/<[^>]*>/g, '').
      trim();
      updateHistory(apiresponseText);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Chatbot Header */}
        <div className="flex justify-between items-center py-2 px-3 rounded-t-lg shadow-lg text-white bg-black w-[450px]">
          <div className="flex items-center gap-1">
            <ChatBotIcon />
            <h1 className="text-lg font-semibold">TravelBot</h1>
          </div>
          <button className="p-2 hover:bg-slate-700 rounded">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </button>
        </div>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className="py-2 px-2 shadow-lg w-[450px] h-[500px] overflow-y-auto bg-white flex flex-col rounded-b-lg pb-20 mb-3"
        >
          <div className="flex flex-col flex-grow space-y-4 p-2 pb-6">
            <div className="flex gap-2 justify-start items-start max-w-[70%]">
              <SendingIcon />
              <p className="font-normal bg-sky-100 px-4 py-2 rounded-r-lg rounded-bl-lg shadow-lg w-full">
                Hey there! <br /> How can I help you today?
              </p>
            </div>
            {chatHistory.map((chat, index) => (
              <ChatMessage chat={chat} key={index} />
            ))}
          </div>
        </div>

        {/* Fixed Message Input Field */}
        <UseForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateChatBotResponse={generateChatBotResponse} />
      </div>
    </>
  );
}

export default App;