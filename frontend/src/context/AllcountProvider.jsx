import React, {useState} from "react";
import AllCount from "./allCount";



const AllcountProvider = ({children}) => {
  const [favCount, setFavCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  return (<AllCount.Provider value={{favCount,setFavCount,cartCount,setCartCount}}>
    {children}
</AllCount.Provider>)
};

export default AllcountProvider;
