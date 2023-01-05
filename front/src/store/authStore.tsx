import React, { useState, useContext } from "react";
import WebsocketApi from "./websocket";
import { string } from "prop-types";

interface AuthStoreType {
  isLoggedIn: boolean;
  token: string;
  onLoginAsGuest: () => void;
  onLogout: () => void;
}

interface IProps {
  children: any;
}

interface Response {
  ID: string;
  action: string;
  content: Record<string, any>;
}

const AuthStore = React.createContext<AuthStoreType>({
  isLoggedIn: false,
  token: "",
  onLoginAsGuest: () => {},
  onLogout: () => {},
});

export const AuthStoreProvider = (props: IProps) => {
  const api = useContext(WebsocketApi);
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginAsGuestHandler = () => {
    api
      .send({
        action: "new-guest",
        content: {},
      })
      .then((res: Response) => {
        if (!!res.content["token"]) {
          setToken(res.content["token"]);
          setIsLoggedIn(true);
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthStore.Provider
      value={{
        isLoggedIn: isLoggedIn,
        token: token,
        onLoginAsGuest: loginAsGuestHandler,
        onLogout: loginAsGuestHandler,
      }}
    >
      {props.children}
    </AuthStore.Provider>
  );
};

export default AuthStore;
