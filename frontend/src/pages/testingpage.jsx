import React from "react";
import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
const testingpage = () => {
  return (
    <div className="h-screen flex flex-col">
      <CustomNav />

      <main className="flex-1 overflow-y-auto scrollbar-none">
       
       <div className="h-50"> hello </div>
       <div className="h-50"> hello </div>
       <div className="h-50"> hello </div>
       <div className="h-50"> hello </div>
       <div className="h-50"> hello </div>
       <div className="h-50"> hello </div>
       <div className="h-50"> hello </div>
       <div className="h-50"> hello </div>
       <div className="h-50"> hello </div>
       <div className="h-50"> hello </div>
       
       
       </main>

      <BottomBar />
    </div>
  );
};

export default testingpage;
