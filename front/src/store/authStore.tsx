import React, { useState, useContext } from "react";
import WebsocketApi from "./websocket";

interface AuthStoreType {
  isLoggedIn: boolean;
  onLoginAsGuest: () => void;
  onLogout: () => void;
}

interface IProps {
  children: any;
}

const AuthStore = React.createContext<AuthStoreType>({
  isLoggedIn: false,
  onLoginAsGuest: () => {},
  onLogout: () => {},
});

export const AuthStoreProvider = (props: IProps) => {
  const api = useContext(WebsocketApi);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginAsGuestHandler = () => {
    setIsLoggedIn(true);
    api
      .send({
        ID: "koszka",
        content: "bardzo duża koszka",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthStore.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLoginAsGuest: loginAsGuestHandler,
        onLogout: loginAsGuestHandler,
      }}
    >
      {props.children}
    </AuthStore.Provider>
  );
};

export default AuthStore;
