import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import SockJS from "sockjs-client";
import { baseURL } from "../config/AxiosHelper";
import { timeAgo } from "../config/helper";
import toast from "react-hot-toast";
import { Stomp } from "@stomp/stompjs";
import { useNavigate } from "react-router";
import { getMessage } from "../services/Roomservice";

const ChatPage = () => {
  const { roomId, currentUser, connected, setConnected, setCurrentUser, setRoomId } = useChatContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();

  // 1. Guard check for active connection
  useEffect(() => {
    if (!connected || !roomId) {
      navigate("/");
    }
  }, [connected, roomId, navigate]);

  // 2. Fetch historic messages
  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await getMessage(roomId);
        setMessages(response || []);
      } catch (error) {
        console.error("Failed to load initial messages:", error);
        toast.error("Could not load message history.");
      }
    }
    if (connected && roomId) {
      loadMessages();
    }
  }, [connected, roomId]);

  // 3. WebSocket / SockJS Connection Lifecycle
  useEffect(() => {
    if (!connected || !roomId) return;

    // Use absolute URL from Axios helper or window relative location
    const socketUrl = `${baseURL}/chat`; 
    const sock = new SockJS(socketUrl);
    const client = Stomp.over(sock);

    // Disable excessive STOMP debug logs in production
    client.debug = () => {};

    client.connect({}, () => {
      setStompClient(client);
      toast.success("Connected to chat server");

      client.subscribe(`/topic/room/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, newMessage]);
      });
    }, (error) => {
      console.error("STOMP connection error:", error);
      toast.error("WebSocket connection lost");
    });

    // Clean up subscription on unmount or room change
    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, [connected, roomId]);

  // 4. Auto Scroll to bottom on new message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  // 5. Logout / Leave Action
  const handleLogOut = () => {
    if (stompClient && stompClient.connected) {
      stompClient.disconnect();
    }
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  };

  // 6. Send Message Action
  const sendMessage = () => {
    if (stompClient && stompClient.connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input.trim(),
        roomId: roomId
      };
      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen text-white bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 z-10 flex items-center justify-around w-full py-4 bg-gray-800 shadow-md">
        <h1 className="text-xl font-semibold">
          Room Id: <span className="text-green-400">{roomId}</span>
        </h1>
        <h1 className="text-xl font-semibold">
          User: <span className="text-purple-400">{currentUser}</span>
        </h1>
        <button
          onClick={handleLogOut}
          className="px-4 py-2 text-sm transition bg-red-600 rounded-lg hover:bg-red-700"
        >
          Leave Room
        </button>
      </header>

      {/* Main Chat Box */}
      <main ref={chatBoxRef} className="w-full h-full px-4 py-20 mx-auto overflow-y-auto md:w-2/3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`my-2 p-3 max-w-sm rounded-lg shadow ${
                message.sender === currentUser ? "bg-green-600" : "bg-purple-600"
              }`}
            >
              <div className="flex flex-row items-start gap-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src={`https://avatar.iran.liara.run/public/${index + 1}`}
                  alt="Avatar"
                />
                <div className="flex flex-col">
                  <p className="text-xs font-bold text-gray-200">{message.sender}</p>
                  <p className="my-1 text-sm">{message.content}</p>
                  <p className="text-[10px] text-gray-300 self-end">
                    {timeAgo(message.timeStamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input Bar */}
      <div className="fixed bottom-0 w-full py-3 bg-gray-900">
        <div className="flex items-center justify-between w-full px-4 mx-auto bg-gray-800 rounded-lg md:w-2/3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="w-full px-2 py-3 text-white bg-transparent focus:outline-none"
            placeholder="Type your message..."
          />
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
              <MdAttachFile size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="p-2 bg-green-600 rounded hover:bg-green-700"
            >
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;