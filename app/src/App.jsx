import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminOrder from "./pages/AdminOrder";
const App = () => {
//   const { user, setUser } = useContext(AllCount);
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}/user/profile`,
//           {
//             credentials: "include",
//           },
//         );
//         const data = await response.json();
//         if (data.code === "NU") {
//           setUser(null);
//           return;
//         }
//         setUser({
//           userId: data._id,
//           userName: data.username,
//           userEmail: data.email,
//           userRole: "user",
//         });
//       } catch (err) {
//         console.log("PROFILE ERROR:", err);
//         setUser(null);
//       }
//     };

//     getUser();
//   }, [setUser]);
  return (
    <div>
      <Routes>
       

        <Route path="/" element={<Dashboard />} />
        <Route path="/admin/orders" element={<AdminOrder />} />
       
      </Routes>
    </div>
  );
};

export default App;
