import React, { useState } from "react";
import AllCount from "./allCount";

const AllcountProvider = ({ children }) => {
  const [favCount, setFavCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(false); //user status
  const [contextEmail, setContextEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState(""); //verify OTP code
  return (
    <AllCount.Provider
      value={{
        favCount,
        setFavCount,

        cartCount,
        setCartCount,

        user,
        setUser,

        contextEmail,
        setContextEmail,

        verifyCode,
        setVerifyCode,
      }}
    >
      {children}
    </AllCount.Provider>
  );
};

export default AllcountProvider;
