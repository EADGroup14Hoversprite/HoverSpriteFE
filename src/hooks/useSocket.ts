import { useEffect, useState } from "react";
import io from "socket.io-client";
import Socket = SocketIOClient.Socket;

export const useSocket = (token: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:9092", {
      transports: ["websocket"],
      query: {
        token: token,
      },
    });
    newSocket.on("notification", () => {
      console.log("Connected to Socket.IO server");
      console.log(token);
    });

    newSocket.on("connect_error", (error: Error) => {
      console.error("Socket.IO connection error:", error);
      console.error("Socket.IO connection error:", token);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  return socket;
};
