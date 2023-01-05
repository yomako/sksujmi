import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface Message {
  action: string;
  content: Record<string, any>;
}

interface WebsocketApiType {
  send: (message: Message) => Promise<Message & { ID: string }>;
}

interface IProps {
  children: any;
}

const WebsocketApi = React.createContext<WebsocketApiType>({
  send: (message: Message) =>
    Promise.resolve({
      ID: "",
      action: "",
      content: {
        code: 404,
        message: "no response",
      },
    }),
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
    const messageToSend: Message & { ID: string } = {
      ID: ((Math.random() + 1) * 13434).toString(36).replace(".", ""),
      ...message,
    };
    sendMessage(JSON.stringify(messageToSend));
    return new Promise<Message & { ID: string }>((resolve, reject) => {
      setTimeout(() => {
        let response = messageHistoryRef.current.find(
          (el) => JSON.parse(el.data)["ID"] === messageToSend.ID
        );
        if (!!response) {
          resolve(JSON.parse(response.data));
        } else {
          reject({
            ID: "",
            action: "",
            content: {
              code: 404,
              message: "no response",
            },
          });
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
