import { Link, useLocation } from "react-router-dom";
import CustomNav from "../CategoryComponents/CustomNav";
import ChangePassword from "../components/ChangePassword";
import ChangeEmail from "../components/ChangeEmail";
import VerifyOTP from "../components/VerifyOTP";
import ForgetPassword from "../components/ForgetPassword";
import { Helmet } from "react-helmet-async";
import BottomBar from "../components/BottomBar";
const HelpingPage = () => {
  const location = useLocation();
  const code = location.state || {};
  const header = {
    ce: "Change Email",
    cp: "Change Password",
    ve: "Verify Email",
    fp: "Forget Password",
  };

  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      <Helmet>
        <title>BiteBox | Verify OTP</title>
      </Helmet>
      <CustomNav text={header[code]} />
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none">
        {code === "ce" && <ChangeEmail heading={header[code]} />}
        {code === "cp" && <ChangePassword />}
        {code === "ve" && <VerifyOTP />}
        {code === "fp" && <ForgetPassword />}
      </main>
      <BottomBar/>
    </div>
  );
};

export default HelpingPage;
