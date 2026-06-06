import Navbar from "../components/Navbar";
import HeroImage from "../components/HeroImage";
import Subheadsee from "../atomic/Subheading";
import Category from "../components/Categories";
import HorizontalFc from "../components/HorizontalFC";
import SquareFc from "../components/SquareFC";
import BottomBar from "../components/BottomBar";
import Subheading from "../atomic/atomic";
import { SeeMore, Heartclick } from "../atomic/atomic";
import { Utensils } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// const heroImagesArray = [
//   { data: data.heroImage, title: "Burger" },
//   { data: data.heroImage, title: "Pizza" },
//   { data: data.heroImage, title: "Chiken" },
//   { data: data.heroImage, title: "Mutton" },
//   { data: data.heroImage, title: "Drinks" },
// ];

const para =
  "Chicken Biryani is an aromatic, flavorful South Asian dish. It features tender, spiced, marinated chicsdrfeg sfrgvd gxhsys";

const Home = () => {
  const [image, setImage] = useState({heroImage:""});
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("/api/");
        const data = await res.json();
        setImage(data);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, []);
  return (
    <>
      {/* navbar  */}
      <Navbar />

      {/* greeting heading  */}
      <h1 className="ml-3 my-0 mt-1.5 flex font-bold text-gray-400 text-md">
        Are you Hungry <Utensils strokeWidth={1} className="w-5" />
      </h1>
      <h1 className="ml-3 my-0 font-extrabold text-xl">
        What meal do you Want?
      </h1>

      {/* hero section  */}
      <section className="flex overflow-x-auto mt-2 gap-4 h-60 relative px-[5%] snap-x snap-mandatory scroll-smooth no-scrollbar">
        <HeroImage image={image} />

        {/* Dynamic Dots Indicator */}
        <ul className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          <li className="rounded-full w-6 h-2 transition-colors duration-300 bg-white"></li>
          <li className="rounded-full w-6 h-2 transition-colors duration-300 bg-white/50"></li>
          <li className="rounded-full w-6 h-2 transition-colors duration-300 bg-white/50"></li>
          <li className="rounded-full w-6 h-2 transition-colors duration-300 bg-white/50"></li>
          <li className="rounded-full w-6 h-2 transition-colors duration-300 bg-white/50"></li>
        </ul>
      </section>

      {/* catgories section  */}
      <section className=" mb-4">
        <Subheadsee subHeading="Categories" path="/categories" />
        <div className="flex justify-evenly">
          <Category text="Burger" image={image} />
          <Category text="Pizza" image={image} />
          <Category text="Biriyani" image={image} />
          <Category text="Drinks" image={image} />
        </div>
      </section>

      {/* trending now  */}
      <section className="mb-2 px-4">
        <Subheading title="Trending Now" className="ml-4" />
        <div className=" flex items-center overflow-x-auto gap-5 py-3 scrollbar-none">
          <SquareFc />
          <SquareFc />
          <SquareFc />
          <SquareFc />

          <SeeMore path="/trending" />
        </div>
      </section>

      {/* Popular meals section  */}
      <section className="mb-5">
        <Subheadsee subHeading="Popular Meals" path="/popular" />
        <div className="px-5">
          <HorizontalFc para={para} item="Chiken Biriyani" image={image} />
          <HorizontalFc para={para} item="Paneer Tikka" image={image} />
          <HorizontalFc para={para} item="Lachha Paratha" image={image} />
        </div>
      </section>

      {/* recomended for you*/}
      <section className="mb-18 px-4">
        <Subheading title="Recomended for you" className="ml-4" />
        <div className=" flex justify-evenly flex-wrap items-center gap-5 py-3 scrollbar-none">
          <SquareFc />
          <SquareFc />
          <SquareFc />
          <SquareFc />
          {/* <SquareFc />
          <SquareFc /> */}

          <SeeMore path="/recommended" />
        </div>
      </section>

      {/* bottom bar  */}
      <BottomBar />
    </>
  );
};

export default Home;
