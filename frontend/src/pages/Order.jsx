import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import OrderCard from "../components/OrderCard";
const Order = () => {
  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      <CustomNav text="Orders" />
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-3 px-2 flex flex-col gap-3">
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </main>
      <BottomBar />
    </div>
  );
};

export default Order;
