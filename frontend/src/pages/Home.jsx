import Navbar from "../components/Navbar";
import HeroImage from "../components/HeroImage";
import Subheading from "../atomic/Subheading";
import Category from "../components/Categories";
import HorizontalFc from "../components/HorizontalFC";
import SquareFc from "../components/SquareFC";
import BottomBar from "../components/BottomBar";
import { SeeMore } from "../components/atomic";
import {
  Heart,
  House,
  Blocks,
  Bell,
  ShoppingCart,
  ShoppingBag,
  Search,
  NotebookPen,
  UserRound,
  Utensils,
  Component,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

const data = {
  heroImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzvMyociTNf4UqFHzh5Iu5503ne7cfJkLbg&s",
  text: "Sink your teeth into the juiciest, flavor-packed bite your cravings have been waiting for.",
};

const heroImagesArray = [
  { data: data.heroImage, title: "Burger" },
  { data: data.heroImage, title: "Pizza" },
  { data: data.heroImage, title: "Chiken" },
  { data: data.heroImage, title: "Mutton" },
  { data: data.heroImage, title: "Drinks" },
];

const para =
  "Chicken Biryani is an aromatic, flavorful South Asian dish. It features tender, spiced, marinated chicsdrfeg sfrgvd gxhsys";

const Home = () => {
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
        <HeroImage {...data} />
        <HeroImage {...data} />
        <HeroImage {...data} />
        <HeroImage {...data} />
        <HeroImage {...data} />

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
      <section className=" mb-8">
        <Subheading heading="Categories" />
        <div className="flex justify-evenly">
          <Category text="Burger" image={data.heroImage} />
          <Category text="Pizza" image={data.heroImage} />
          <Category text="Biriyani" image={data.heroImage} />
          <Category text="Drinks" image={data.heroImage} />
        </div>
      </section>

      {/* Popular meals section  */}
      <section className="mb-5">
        <Subheading heading="Popular Meals" />
        <div className="px-5">
          <HorizontalFc
            para={para}
            item="Chiken Biriyani"
            image={data.heroImage}
          />
          <HorizontalFc
            para={para}
            item="Paneer Tikka"
            image={data.heroImage}
          />
          <HorizontalFc
            para={para}
            item="Lachha Paratha"
            image={data.heroImage}
          />
        </div>
        <SeeMore />
      </section>

      {/* trending now  */}
      <section className="mb-50 border">
        <p>Trending Now</p>
        <div className="px-2 flex overflow-x-auto gap-5 py-10">
          <SquareFc />
          <SquareFc />
          <SquareFc />
          <SquareFc />
        </div>
      </section>

      {/* bottom bar  */}
      <BottomBar />
    </>
  );
};

export default Home;
