import { Link, useLocation } from "react-router-dom";
import CustomNav from "../CategoryComponents/CustomNav";
import ChangePassword from "../components/ChangePassword";
import { ChangeEmail } from "../components/ChangePassword";
import VerifyOTP from "../components/VerifyOTP";
const HelpingPage = () => {
  const location = useLocation();
  const code = location.state || {}; // Extract your value safely
  console.log(code);
  return (
    <div className="h-screen flex flex-col ">
      <CustomNav text="Tushar" />
      <main className="flex-1 overflow-y-auto scrollbar-none">
        {code === "ce" && <ChangeEmail />}
        {code === "cp" && <ChangePassword />}
        {code === "ve" && <VerifyOTP />}
      </main>
    </div>
  );
};

export default HelpingPage;
//have to edit not ready yet
