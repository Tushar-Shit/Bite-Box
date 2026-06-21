import { Link, useLocation } from "react-router-dom";
import CustomNav from "../CategoryComponents/CustomNav";
import ChangePassword from "../components/ChangePassword";
import { ChangeEmail } from "../components/ChangePassword";
const HelpingPage = () => {
  const location = useLocation();
  const code = location.state || {}; // Extract your value safely
  console.log(code);
  return (
    <div className="bg-zinc-200 min-h-screen flex flex-col">
      <CustomNav text="Tushar" />
      {/* <div>tushar</div> */}
      <div className="flex-1 flex items-center justify-center p-4">
        {code === "ce" &&<ChangeEmail />}
        {code === "cp" &&<ChangePassword />}
      </div>
    </div>
  );
};

export default HelpingPage;
