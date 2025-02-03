import React, { useState, useEffect, useRef } from 'react';
import ChatBotIcon from './components/ChatBotIcon';
import SendingIcon from './components/SendingIcon';
import UseForm from './components/UseForm';
import ChatMessage from './components/ChatMessage';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll to the latest message when chatHistory updates
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
      <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
        {/* Chat Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-gradient-to-r from-indigo-600 to-blue-500 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          title={isChatOpen ? "Close Chat" : "Open Chat"}
        >
          <div className="w-8 h-6 mb-3">
            <ChatBotIcon />
          </div>
        </button>

        {/* Chat Window */}
        {isChatOpen && (
          <div className="absolute bottom-16 right-0 mb-2">
            <div className="w-[400px] h-[500px] rounded-lg shadow-2xl bg-white overflow-hidden flex flex-col">
              {/* Chatbot Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <ChatBotIcon />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-white">TravelBot</h1>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <p className="text-xs text-blue-100">Online | AI Travel Assistant</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-all duration-300" 
                            title="Settings">
                      <i className="fa-solid fa-gear text-white/80 text-lg"></i>
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-all duration-300" 
                            title="Share Chat">
                      <i className="fa-solid fa-share text-white/80 text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              >
                <div className="flex flex-col space-y-4 p-4 pb-6">
                  {/* Welcome Message */}
                  <div className="flex gap-3 items-start max-w-[85%]">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-robot text-white text-sm"></i>
                    </div>
                    <div className="flex flex-col">
                      <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                        <p className="text-gray-800">
                          👋 Welcome to TravelBot! I'm your personal AI travel assistant for Sri Lanka. 
                          How can I help plan your perfect journey today?
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  {chatHistory.map((chat, index) => (
                    <ChatMessage chat={chat} key={index} />
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="mt-auto">
                <UseForm 
                  chatHistory={chatHistory} 
                  setChatHistory={setChatHistory} 
                  generateChatBotResponse={generateChatBotResponse} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;