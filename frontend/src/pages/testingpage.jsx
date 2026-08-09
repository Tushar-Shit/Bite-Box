import React, { useState } from "react";
import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import Capsul from "../components/Capsul";
const testingpage = () => {
  const [searchText, setSearchText] = useState("");
  const [funnytext, setFunnytext] = useState("");
  console.log(searchText);

  const handle = async (e) => {
    e.preventDefault();
    setFunnytext("Wait bro it not works yet!!");
  };
  return (
    <div className="h-screen flex flex-col">
      <CustomNav text="Search" />

      <main className="flex-1 overflow-y-auto scrollbar-none">
        <form onSubmit={handle} className="py-3 px-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Food Item"
            className="border w-3/4 py-2.5 px-3 rounded-4xl rounded-r-none border-r-0"
          />
          <button
            type="submit"
            className="w-1/4 py-2.25 rounded-r-4xl text-lg bg-amber-500 cursor-pointer"
          >
            Go
          </button>
        </form>

        <div className="h-full overflow-y-auto">
          <div className="pt-3 px-2 flex justify-center gap-3 flex-wrap">
            <Capsul text="Chicken" />
            <Capsul text="Mutton" />
            <Capsul text="Ice Creame" />
            <Capsul text="Juice" />
            <Capsul text="Fish" />
            <Capsul text="Soupe" />
            <Capsul text="Drinks" />
            <Capsul text="Thali" />
            <Capsul text="Snacks" />
          </div>
          <p className="py-10 text-2xl text-red-500 text-center">{funnytext}</p>
        </div>
      </main>

      <BottomBar />
    </div>
  );
};

export default testingpage;
