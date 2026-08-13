import { ArrowLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomNav = ({ text }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-18 shrink-0 px-6 bg-red-600 flex items-center justify-between text-white shadow-[0_5px_15px_rgba(0,0,0,0.4)] z-10">
      <ArrowLeft
        strokeWidth={1.5}
        onClick={() => navigate(-1)}
        className="rounded-full w-10 h-10 p-1 cursor-pointer"
      />

      <div className="text-xl font-bold">{text}</div>

      <div>
        <Bell
          strokeWidth={1.5}
          className="rounded-full w-10 h-10 p-1 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CustomNav;
