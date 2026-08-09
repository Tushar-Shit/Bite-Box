import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const foods = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRElU92gsj3ZLqKzYiri3_1Hf6ripUQdE0G4w48yu5flsXgGwFuc8aUflQ&s=10",
    text: "Special Burger",
    link: "",
  },
  {
    id: 2,
    image:
      "https://media.istockphoto.com/id/603267744/photo/tapas-food.jpg?s=612x612&w=0&k=20&c=kHdCs_6B9YizzPkuynSpgJnTf8m37xsAQ6czvu0cXBU=",
    text: "Seasonal Foods",
    link: "",
  },
  {
    id: 3,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/079/935/468/small/assorted-colorful-ice-cream-dessert-scoops-png.png",
    text: "Ice & Cakes",
    link: "",
  },
  {
    id: 4,
    image:
      "https://thumbs.dreamstime.com/b/indian-thali-meal-chicken-fish-vegetables-food-showing-high-resolution-image-suitable-commercial-use-clear-details-413418814.jpg",
    text: "Today's Special",
    link: "",
  },
  {
    id: 5,
    image:
      "https://png.pngtree.com/thumb_back/fh260/background/20231221/pngtree-culinary-harmony-stylish-korean-inspired-chicken-lollipops-at-food-festival-background-image_15527981.jpg",
    text: "Dry Leg Pieces",
    link: "",
  },
];

const extendedFoods = [...foods, ...foods];
const HeroImage = () => {
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // We reached the duplicated first image
    if (index === foods.length) {
      const timeout = setTimeout(() => {
        // Remove animation
        setTransition(false);

        // Instantly go back to the real first image
        setIndex(0);
      }, 700);

      return () => clearTimeout(timeout);
    }

    // After instant reset, enable animation again
    if (index === 0) {
      const timeout = setTimeout(() => {
        setTransition(true);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <section className="w-full overflow-hidden py-3 px-3">
      <div
        className={`flex gap-5 ${
          transition ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(calc(-${index} * (94vw + 20px)))`,
        }}
      >
        {extendedFoods.map((food, i) => (
          <Link
            to={food.link}
            key={`${food.id}-${i}`}
            className="
              relative
              min-w-[94vw]
              h-50
              overflow-hidden
              rounded-2xl
              shadow-lg
              group
              shrink-0
            "
          >
            <img
              src={food.image}
              alt={food.text || "Food"}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />

            {food.text && (
              <div className="absolute inset-0 bg-black/30 flex items-end">
                <div className="w-full p-4">
                  <h2 className="text-white text-xl font-bold">{food.text}</h2>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};
export default HeroImage;
