import { ArrowLeft, Bell } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";

const CustomNav = ({text}) => {
 const navigate=useNavigate();
  return (
    <div className="h-17">
    <div className="w-full h-18 px-6 bg-red-600 flex items-center justify-between text-white shadow-[0_5px_15px_rgba(0,0,0,0.4)] fixed top-0 z-10">
      
        <ArrowLeft strokeWidth={1.5} onClick={()=>navigate(-1)} className="rounded-full w-10 h-10 p-1" />
     
      <div className="text-xl font-bold">{text}</div>
      <div>
        <Bell strokeWidth={1.5} className="rounded-full w-10 h-10 p-1" />
      </div>
    </div>
    </div>
  );
};

export default CustomNav;