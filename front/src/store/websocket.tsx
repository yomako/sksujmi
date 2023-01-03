import React, { useState, useCallback, useEffect } from "react";
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
  const [messageHistory, setMessageHistory] = useState<
    Array<MessageEvent<any>>
  >([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleSendMessage = useCallback((message: Message) => {
    return new Promise((resolve, reject) => {
      sendMessage(JSON.stringify(message));
      setTimeout(() => {
        let response = messageHistory.find(
          (el) => JSON.parse(el.data)["ID"] === message.ID
        );
        if (!!response) resolve(response);
        else {
          console.log(messageHistory);
          reject("no response");
        }
      }, 300);
    });
  }, []);

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
