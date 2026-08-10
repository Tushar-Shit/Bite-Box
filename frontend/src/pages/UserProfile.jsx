import { SquarePen } from "lucide-react";
import { Helmet } from "react-helmet-async";
import CustomNav from "../CategoryComponents/CustomNav";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import FoodLoader from "../components/Loader";
import BottomBar from "../components/BottomBar";
// Support component
const KeyValue = ({ keyName, value }) => {
  return (
    <div className="p-2 w-full border-t border-dotted flex items-center justify-between relative">
      <p className="bg-zinc-200 absolute -top-2.5 text-sm text-zinc-500 px-1">
        {keyName}
      </p>
      <p className="mt-1 break-all">{value}</p>
    </div>
  );
};

const UserProfile = () => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState({});
  const [joinDate, setJoinDate] = useState("");
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    mobile: "",
    address1: "",
    address2: "",
  });

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/profile`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (data.code === "NU" || data.code === "NL") {
          console.log(data.message);
          return;
        }
        setLoader(false);
        setUser(data);

        setFormData({
          username: data.username || "",
          email: data.email || "",
          age: data.age || "",
          mobile: data.mobile || "",
          address1: data.address1 || "",
          address2: data.address2 || "",
        });

        const dateObj = new Date(data.createdAt);

        const day = dateObj.getDate();
        const month = dateObj.toLocaleDateString("en-US", {
          month: "long",
        });
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
      } catch (err) {
        console.log(err);
      }
    }

    getUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCancel() {
    setFormData({
      username: user.username || "",
      email: user.email || "",
      age: user.age || "",
      mobile: user.mobile || "",
      address1: user.address1 || "",
      address2: user.address2 || "",
    });

    setEdit(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.username.trim() === "") {
      alert("Invalid username");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            mobile: formData.mobile,
            address1: formData.address1,
            address2: formData.address2,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong.");
        return;
      }

      setUser((prev) => ({
        ...prev,
        ...formData,
      }));

      setEdit(false);
    } catch (err) {
      console.log(err);
      alert("Unable to update profile.");
    }
  }

  return (
    <div className="fixed inset-0 h-dvh flex flex-col bg-zinc-50/50 antialiased selection:bg-amber-100 z-0">
      <Helmet>
        <title>BiteBox | Your Profile</title>
      </Helmet>

      {/* Header Navigation */}
      <CustomNav text="Your Profile" />

      {/* Scrollable Content Container */}
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none pb-24">
        {loader ? (
          <div className="h-64 flex items-center justify-center">
            <FoodLoader />
          </div>
        ) : (
          <>
            {/* Header Hero Section: Profile Card Overview */}
            <div className="w-full bg-white border-b border-zinc-100 py-6 px-4 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center z-0">
              {/* High-visibility Ring Enclosed Avatar */}
              <div className="relative z-0 group">
                <div className="absolute inset-0 bg-linear-to-tr from-amber-500 to-orange-400 rounded-full blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHCBu2asBmYHBPRvht-u5d_alNH19z7VhL-w&s"
                  }
                  alt="Profile"
                  className="relative z-0 h-24 w-24 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Meta Typography Profile Details */}
              <div className="mt-3 space-y-0.5 z-0">
                <p className="text-xl font-extrabold text-zinc-900 tracking-tight">
                  {user.username}
                </p>
                <p className="text-sm font-medium text-zinc-500 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {user.email}
                </p>
                <p className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100/40">
                  Joined {joinDate}
                </p>
              </div>
            </div>

            {/* Core Dynamic Workflow Layout Container */}
            <div className="w-[92%] max-w-2xl mx-auto mt-5 relative z-0">
              {edit ? (
                /* ==================== FORM EDITING STATE ==================== */
                <form
                  onSubmit={handleSubmit}
                  className="p-5 sm:p-6 bg-white border border-zinc-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-4 z-0"
                >
                  {/* Full Name Field Wrapper */}
                  <div className="relative z-0">
                    <label className="text-xs font-bold text-zinc-700 tracking-wide uppercase">
                      Full Name
                    </label>
                    <div className="relative mt-1 z-0">
                      <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full text-sm text-zinc-800 font-medium border border-zinc-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 rounded-xl p-2.5 px-3.5 bg-white outline-none transition-all duration-150"
                        placeholder="Enter full name"
                      />
                    </div>
                  </div>

                  {/* Disabled Email Field Wrapper */}
                  <div className="relative z-0">
                    <label className="text-xs font-bold text-zinc-400 tracking-wide uppercase">
                      Email Address
                    </label>
                    <div className="relative mt-1 z-0">
                      <input
                        value={formData.email}
                        disabled
                        className="w-full text-sm text-zinc-400 font-medium border border-zinc-200/60 rounded-xl p-2.5 px-3.5 bg-zinc-50/80 cursor-not-allowed select-none"
                      />
                    </div>
                  </div>

                  {/* Mobile Number Field Wrapper */}
                  <div className="relative z-0">
                    <label className="text-xs font-bold text-zinc-700 tracking-wide uppercase">
                      Mobile Number
                    </label>
                    <div className="relative mt-1 z-0">
                      <input
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full text-sm text-zinc-800 font-medium border border-zinc-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 rounded-xl p-2.5 px-3.5 bg-white outline-none transition-all duration-150"
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>

                  {/* Address 1 Field Wrapper */}
                  <div className="relative z-0">
                    <label className="text-xs font-bold text-zinc-700 tracking-wide uppercase">
                      Primary Address (Line 1)
                    </label>
                    <div className="relative mt-1 z-0">
                      <input
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        className="w-full text-sm text-zinc-800 font-medium border border-zinc-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 rounded-xl p-2.5 px-3.5 bg-white outline-none transition-all duration-150"
                        placeholder="Street name, building info"
                      />
                    </div>
                  </div>

                  {/* Address 2 Field Wrapper */}
                  <div className="relative z-0">
                    <label className="text-xs font-bold text-zinc-700 tracking-wide uppercase">
                      Secondary Address (Line 2)
                    </label>
                    <div className="relative mt-1 z-0">
                      <textarea
                        rows={3}
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        className="w-full text-sm text-zinc-800 font-medium border border-zinc-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 rounded-xl p-2.5 px-3.5 bg-white outline-none resize-none transition-all duration-150"
                        placeholder="Locality, landmarks, city"
                      />
                    </div>
                  </div>

                  {/* Action Interaction Controls */}
                  <div className="flex items-center gap-3 pt-2 z-0">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 h-11 text-sm font-bold rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition active:scale-[0.98] cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="flex-1 h-11 text-sm font-bold rounded-xl bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-sm shadow-orange-500/10 transition active:scale-[0.98] cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                /* ==================== DEFAULT READ-ONLY STATE ==================== */
                <div className="p-5 sm:p-6 bg-white border border-zinc-100 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col gap-4 z-0">
                  {/* Information Row Segment Grid list */}
                  <div className="divide-y divide-zinc-100/80 space-y-3.5 z-0">
                    <div className="pt-0">
                      <KeyValue keyName="Full Name" value={user.username} />
                    </div>
                    <div className="pt-3.5">
                      <KeyValue keyName="Email Address" value={user.email} />
                    </div>
                    <div className="pt-3.5">
                      <KeyValue
                        keyName="Mobile No."
                        value={user.mobile || "NIL"}
                      />
                    </div>
                    <div className="pt-3.5">
                      <KeyValue
                        keyName="Address 1"
                        value={user.address1 || "NIL"}
                      />
                    </div>
                    <div className="pt-3.5">
                      <KeyValue
                        keyName="Address 2"
                        value={user.address2 || "NIL"}
                      />
                    </div>
                  </div>

                  {/* Edit State Activator Button */}
                  <div className="flex justify-center pt-4 border-t border-zinc-100 z-0">
                    <button
                      onClick={() => setEdit(true)}
                      className="w-full sm:w-48 h-11 flex items-center justify-center gap-2 bg-zinc-950 hover:bg-amber-500 text-white hover:text-white transition-all duration-200 rounded-xl text-sm font-bold cursor-pointer active:scale-95 shadow-md shadow-zinc-950/5 hover:shadow-amber-500/10"
                    >
                      <SquarePen size={15} strokeWidth={2.5} />
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Bottom Sticky Action Tab-bar */}
      <BottomBar />
    </div>
  );
};

export default UserProfile;
