import { SquarePen } from "lucide-react";
import {Helmet} from "react-helmet-async";
import CustomNav from "../CategoryComponents/CustomNav";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// support component
const KeyValue = ({ keyName, value }) => {
  return (
    <div className="p-2 w-90% border-t border-dotted  flex items-center justify-between  relative">
      <p className="bg-zinc-200 absolute -top-2.5  text-sm text-zinc-500">
        {keyName}
      </p>
      <p className="mt-1">{value}</p>
    </div>
  );
};

const UserProfile = () => {
  const location = useLocation();
  const email = location.state || {};

  const [user, setUser] = useState({});
  const [joinDate, setJoinDate] = useState("");
  useEffect(() => {
    const getdata = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user?e=${email}`);
      const { userData } = await res.json();
      setUser(userData);
      const dateObj = new Date(userData.createdAt);

      const day = dateObj.getDate();
      const month = dateObj.toLocaleDateString("en-US", { month: "long" }); // Correct syntax
      const year = dateObj.getFullYear();

      const suffix = (d) => {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };
      setJoinDate(`${day}${suffix(day)} ${month} ${year}`);
    };
    getdata();
  }, []);
  return (
    
    <div>
      <Helmet>
        <title>BiteBox | Your Profile</title>
      </Helmet>
      <CustomNav text="Your Profile" />
      <div>
        <div className="mt-5 flex items-center justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHCBu2asBmYHBPRvht-u5d_alNH19z7VhL-w&s"
            alt=""
            className="h-[10vh] w-[10vh] rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl font-bold">{user.username}</p>
          <p className="text-md font-normal text-zinc-500">{user.email}</p>
          <p className="text-sm text-zinc-400">Join on {joinDate}</p>
        </div>
      </div>
      <div className=" w-[90%] mt-5 p-5 justify-self-center flex flex-col gap-3 bg-zinc-200 rounded-lg">
        <KeyValue keyName="FullName" value={user.username} />
        <KeyValue keyName="Email" value={user.email} />
        <KeyValue keyName="Age" value="20" />
        <KeyValue keyName="Mobile No." value="1234567890" />
        <KeyValue keyName="Address 1" value="Park Street, Kolkata" />
        <KeyValue
          keyName="Address 2"
          value="Bidhan Medical Shop, Pratappur, Barjora, Bankura, 722202"
        />
        <div className="flex justify-center">
          <button className="w-[30%] flex justify-center items-center gap-1 bg-orange-500 rounded-lg text-taupe-50">
            <SquarePen size={15} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
export { KeyValue };
