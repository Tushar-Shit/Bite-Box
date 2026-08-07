import { SquarePen } from "lucide-react";
import { Helmet } from "react-helmet-async";
import CustomNav from "../CategoryComponents/CustomNav";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import FoodLoader from "../components/Loader";
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
    <div className="min-h-screen">
      <Helmet>
        <title>BiteBox | Your Profile</title>
      </Helmet>

      <CustomNav text="Your Profile" />
      {loader ? (
        <FoodLoader />
      ) : (
        <>
          <div className="mt-5 flex items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHCBu2asBmYHBPRvht-u5d_alNH19z7VhL-w&s"
              alt="Profile"
              className="h-[10vh] w-[10vh] rounded-full"
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-xl font-bold">{user.username}</p>
            <p className="text-md text-zinc-500">{user.email}</p>
            <p className="text-sm text-zinc-400">Joined {joinDate}</p>
          </div>
          {edit ? (
            <form
              onSubmit={handleSubmit}
              className="w-[95%] max-w-3xl mx-auto mt-5 p-5 bg-zinc-200 rounded-lg shadow flex flex-col gap-4"
            >
              <div>
                <label className="font-semibold">Full Name</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md p-2 bg-white outline-none"
                />
              </div>

              <div>
                <label className="font-semibold">Email</label>
                <input
                  value={formData.email}
                  disabled
                  className="w-full mt-1 border rounded-md p-2 bg-zinc-100 text-zinc-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold">Mobile Number</label>
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md p-2 bg-white outline-none"
                />
              </div>

              <div>
                <label className="font-semibold">Address 1</label>
                <input
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md p-2 bg-white outline-none"
                />
              </div>

              <div>
                <label className="font-semibold">Address 2</label>
                <textarea
                  rows={3}
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md p-2 bg-white outline-none resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-36 h-10 rounded-lg bg-zinc-500 text-white hover:bg-zinc-600 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-36 h-10 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="w-[95%] max-w-3xl mx-auto mt-5 p-4 sm:p-5 md:p-6 bg-zinc-200 rounded-lg shadow flex flex-col gap-3">
                <KeyValue keyName="Full Name" value={user.username} />
                <KeyValue keyName="Email" value={user.email} />
                <KeyValue keyName="Mobile No." value={user.mobile || "NIL"} />
                <KeyValue keyName="Address 1" value={user.address1 || "NIL"} />
                <KeyValue keyName="Address 2" value={user.address2 || "NIL"} />

                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => setEdit(true)}
                    className="w-full sm:w-48 md:w-52 h-10 flex items-center justify-center gap-2 bg-orange-500 hover:bg-red-600 transition-colors rounded-lg text-white cursor-pointer"
                  >
                    <SquarePen size={16} />
                    Edit
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;
