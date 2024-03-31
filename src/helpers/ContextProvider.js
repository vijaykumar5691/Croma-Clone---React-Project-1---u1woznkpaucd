import React, { createContext, useState } from "react";

const LoginContext = createContext();

const ContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") ? true : false
  );
  return (
    <LoginContext.Provider
      value={{ isLogin: isLogin, setLoginState: setIsLogin }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { ContextProvider, LoginContext };
