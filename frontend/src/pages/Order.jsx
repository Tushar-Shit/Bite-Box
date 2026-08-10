import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
const Order = () => {
  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      <CustomNav text="Orders" />
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none"></main>
      <BottomBar />
    </div>
  );
};

export default Order;
