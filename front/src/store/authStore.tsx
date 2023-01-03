import React, { useState, useEffect } from "react";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginAsGuestHandler = () => {
    setIsLoggedIn(true);
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
