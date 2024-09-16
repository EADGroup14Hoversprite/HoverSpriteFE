import React, { useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";
import { clientSessionToken } from "@/utils/axiosClient";

const StompExample: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  // const [jwt, setJwt] = useState(''); // State to store JWT
  //
  // // Simulating JWT fetch (replace with your actual JWT fetch logic)
  // useEffect(() => {
  //   const fetchJwt = async () => {
  //     // Replace this with your actual JWT fetch logic
  //     const response = await fetch('/api/getJwt');
  //     const data = await response.json();
  //     setJwt(data.jwt);
  //   };
  //
  //   fetchJwt();
  // }, []);

  const { isConnected, subscribe, publish } = useSocket({
    brokerURL: "ws://localhost:8080/notifications",
    jwt: clientSessionToken.value,
    onConnect: () => console.log("Connected!"),
    onDisconnect: () => console.log("Disconnected!"),
    onError: (error) => console.error("Error:", error),
  });

  useEffect(() => {
    if (isConnected) {
      const subscription = subscribe("/topic/messages", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      console.log("hehe");

      return () => {
        subscription?.unsubscribe();
      };
    }
  }, [isConnected]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      publish("/app/sendMessage", { content: inputMessage });
      setInputMessage("");
    }
  };

  return (
    <div>
      <h1>STOMP WebSocket Example with JWT</h1>
      <p>Connection status: {isConnected ? "Connected" : "Disconnected"}</p>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default StompExample;
