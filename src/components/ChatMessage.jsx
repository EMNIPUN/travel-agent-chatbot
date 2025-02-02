import React from 'react';
import SendingIcon from './SendingIcon';

function ChatMessage({ chat }) {
  return (
    <div className={`flex items-start gap-2 ${chat.role === "model" ? "justify-start" : "justify-end"}`}>
      {/* Show ChatBotIcon only for model messages */}
      {chat.role === "model" && <SendingIcon />}

      {chat.imageUrl ? (
        // If an image URL exists, display it instead of text
        <img src={chat.imageUrl} alt="Thinking..." className="w-8 h-8 animate-spin" />
      ) : (
        <p
          className={`font-normal px-4 py-2 rounded-lg shadow-lg max-w-[75%] break-words ${
            chat.role === "model" ? "bg-sky-100 text-black rounded-r-lg" : "bg-black text-white rounded-l-lg"
          }`}
        >
          {chat.text}
        </p>
      )}
    </div>
  );
}

export default ChatMessage;
