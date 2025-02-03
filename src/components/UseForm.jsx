import React, { useRef } from 'react'

function UseForm({ setChatHistory, generateChatBotResponse,chatHistory }) {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = '';

    // Add user message to chat history
    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

    setTimeout(() => {

        const thinkingMessage = {
            role: "model",
            text: "Thinking...", 
            imageUrl: "/icons/more.gif", 
          };
      
        setChatHistory((history) => [...history, thinkingMessage]);

        generateChatBotResponse([...chatHistory, { role: "user", text: "your name is TravelAI, You are a helpful Sri Lanakan tourist agent. Answer queries about travel, destinations, transportation, and accommodations in a friendly and informative manner.and when asked not realted travel quetion give responce message 'Asked travel realted quarion only' "+ userMessage}]);
    },600);

  };

  return (
    <div className='w-[450px] bg-white border-t p-2 flex items-center fixed bottom-[56px] rounded-b-lg'>
      <form action='#' className='flex items-center gap-2 w-full' onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          type='text'
          placeholder='Type a message...'
          className='w-full px-3 py-[7px] border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
        />
        <button
          type='submit'
          className='bg-black text-white px-[20px] py-[4px] rounded-r-lg shadow-lg hover:bg-slate-800 transition-all duration-300 flex items-center justify-center'
        >
          <p className='text-2xl'><i className="fa-solid fa-paper-plane"></i></p>
        </button>
      </form>
    </div>
  )
}

export default UseForm;