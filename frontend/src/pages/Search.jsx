import React, { useEffect, useState } from "react";
import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import Capsul from "../components/Capsul";
import SearchCard from "../components/SearchCard";
import NoData from "../components/NoData";
import LoaderUI from "../components/Loader";
const testingpage = () => {
  const [searchText, setSearchText] = useState("");
  const [loader, setLoader] = useState(false);
  const [nodata, setNodata] = useState(false);
  const [result, setResult] = useState([]);

  const handle = async () => {
    setNodata(false);
    setLoader(true);

    if (searchText === "") {
      console.log("empty search field");
      return;
    }
    const keywords = searchText.trim().split(" ");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/update/search/${keywords}`,
      );
      const data = await response.json();

      if (data.code === "failed" || data.foods.length === 0) {
        console.log(data.message);
        setNodata(true);
        return;
      }
      setResult(data.foods);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchText.trim() === "") {
      setResult([]);
      setNodata(false);
      setLoader(false);
      return;
    }
    setLoader(true);
    const timer = setTimeout(() => {
      handle();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);
return (
  <div className="fixed inset-0 h-dvh flex flex-col bg-zinc-50/60 antialiased selection:bg-amber-100">
    {/* Navigation Bar */}
    <CustomNav text="Search" />
    
    {/* Main Container */}
    <main className="flex-1 min-h-0 flex flex-col relative">
      {/* Modernized Unified Search Form */}
      <div className="p-4 bg-white border-b border-zinc-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <form 
          onSubmit={(e) => {
            e.preventDefault(); // Added safety wrap for programmatic submissions
          }}
          className="flex items-center h-12 w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/10 transition-all duration-200"
        >
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Food Item..."
            className="flex-1 h-full bg-transparent text-sm text-zinc-800 placeholder-zinc-400 font-medium px-4 outline-none border-none"
          />
          <button
            type="submit"
            className="h-[84%] px-5 mr-1 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white cursor-pointer active:scale-95 shadow-sm shadow-amber-500/10 transition-all duration-150 flex items-center justify-center shrink-0"
          >
            Go
          </button>
        </form>
      </div>

      {/* Conditionally Rendered Content Area */}
      {nodata ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <NoData text1="Item Not Exist!" text2="No such item available." />
        </div>
      ) : (
        <div className="flex-1 min-h-0 flex flex-col">
          {/* Scollable Filter Category Suggestion Row */}
          <div className="py-3 px-4 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 bg-white/60 backdrop-blur-sm border-b border-zinc-100/60">
            <Capsul text="Chicken" setSearchText={setSearchText} />
            <Capsul text="Mutton" setSearchText={setSearchText} />
            <Capsul text="Ice Cream" setSearchText={setSearchText} />
            <Capsul text="Juice" setSearchText={setSearchText} />
            <Capsul text="Fish" setSearchText={setSearchText} />
            <Capsul text="Soup" setSearchText={setSearchText} />
            <Capsul text="Thali" setSearchText={setSearchText} />
          </div>

          {/* Results Grid List Container */}
          <div className="flex-1 overflow-y-auto scrollbar-none px-4 pt-3">
            {loader ? (
              <div className="h-40 flex items-center justify-center">
                <LoaderUI />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {result.map((item) => (
                  <SearchCard
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    servingQuantity={item.servingQuantity}
                    quantity={item.quantity}
                    price={item.price}
                    unit={item.unit}
                    available={item.available}
                    view={"list"}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
    
    {/* Bottom Sticky Action Footer */}
    <BottomBar />
  </div>
);




};

export default testingpage;
