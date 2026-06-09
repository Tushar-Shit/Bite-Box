import { ArrowLeft, Bell } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";

import React from "react";

const CustomNav = (data) => {
 const navigate=useNavigate();
  return (
    <div className="bg-red-600 flex items-center justify-between text-white p-4 px-6">
      
        <ArrowLeft strokeWidth={1.5} onClick={()=>navigate(-1)} className="rounded-full w-10 h-10 p-1" />
     
      <div className="text-xl font-bold">{data.text}</div>
      <div>
        <Bell strokeWidth={1.5} className="rounded-full w-10 h-10 p-1" />
      </div>
    </div>
  );
};

export default CustomNav;
