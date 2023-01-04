import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface Message {
  ID: string;
  content: string;
}

interface WebsocketApiType {
  send: (message: Message) => Promise<unknown>;
}

interface IProps {
  children: any;
}

const WebsocketApi = React.createContext<WebsocketApiType>({
  send: (message: Message) => Promise.resolve(),
});

export const WebsocketApiProvider = (props: IProps) => {
  const [socketUrl, setSocketUrl] = useState("ws://localhost:8080");
  const messageHistoryRef = useRef<Array<MessageEvent<any>>>([]);
  const [messageHistory, setMessageHistory] = useState<
    Array<MessageEvent<any>>
  >([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    messageHistoryRef.current = messageHistory;
  }, [messageHistory]);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage, setMessageHistory]);

  const handleSendMessage = (message: Message) => {
    sendMessage(JSON.stringify(message));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let response = messageHistoryRef.current.find(
          (el) => JSON.parse(el.data)["ID"] === message.ID
        );
        if (!!response) resolve(response);
        else {
          reject("no response");
        }
      }, 300);
    });
  };

  return (
    <WebsocketApi.Provider
      value={{
        send: handleSendMessage,
      }}
    >
      {props.children}
    </WebsocketApi.Provider>
  );
};

export default WebsocketApi;
