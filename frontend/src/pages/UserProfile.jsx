import { SquarePen } from "lucide-react";
import CustomNav from "../CategoryComponents/CustomNav";
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
  return (
    <div>
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
          <p className="text-xl font-bold">Tushar Shit</p>
          <p className="text-md font-normal text-zinc-500">Example@gmail.com</p>
          <p className="text-sm text-zinc-400">Join on 12th June 2026</p>
        </div>
      </div>
      <div className=" w-[90%] mt-5 p-5 justify-self-center flex flex-col gap-3 bg-zinc-200 rounded-lg">
        <KeyValue keyName="FullName" value="Tushar Shit" />
        <KeyValue keyName="Email" value="Example@gmail.com" />
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
