import { useEffect, useState } from "react";
import { Client, StompSubscription } from "@stomp/stompjs";

interface UseStompConnectionProps {
  brokerURL: string;
  jwt: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: any) => void;
}

const useSocket = ({
  brokerURL,
  jwt,
  onConnect,
  onDisconnect,
  onError,
}: UseStompConnectionProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL,
      connectHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
      onConnect: () => {
        setIsConnected(true);
        onConnect?.();
      },
      onDisconnect: () => {
        setIsConnected(false);
        onDisconnect?.();
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
        onError?.(frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, [brokerURL, jwt]);

  const subscribe = (
    destination: string,
    callback: (message: any) => void,
  ): StompSubscription | undefined => {
    if (client && isConnected) {
      return client.subscribe(destination, (message) => {
        callback(JSON.parse(message.body));
      });
    }
  };

  const publish = (destination: string, body: any) => {
    if (client && isConnected) {
      client.publish({
        destination,
        body: JSON.stringify(body),
        headers: { Authorization: `Bearer ${jwt}` },
      });
    }
  };

  return { isConnected, subscribe, publish };
};

export default useSocket;
