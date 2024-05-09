import React, { createContext, useState } from "react";
import { fetcher } from "../helpers/index";

const LoginContext = createContext();

const ContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [cartLength, setCartLength] = useState(0);
  const [wishListItems, setWishListItems] = useState([]);
  const [addressType, setAddressType] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  return (
    <LoginContext.Provider
      value={{
        isLogin: isLogin,
        setIsLogin: setIsLogin,
        cartLength: cartLength,
        setCartLength: setCartLength,
        // wishListItems: wishListItems,
        // setWishListItems: setWishListItems,
        address: address,
        setAddress: setAddress,
        fullName,
        setFullName,
        mobile,
        setMobile,
        addressType,
        setAddressType,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { ContextProvider, LoginContext };

const SearchText = createContext("");

const SearchContext = ({ children }) => {
  const [search, setSearch] = useState("");
  return (
    <SearchText.Provider value={{ search, setSearch }}>
      {children}
    </SearchText.Provider>
  );
};
export { SearchContext, SearchText };
