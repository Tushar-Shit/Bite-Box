import { motion } from "framer-motion";

const foods = [
  {
    id: 2,
    image:
      "https://static.vecteezy.com/system/resources/previews/040/216/160/non_2x/ai-generated-roasted-chicken-leg-clip-art-free-png.png",
    name: "Chicken",
  },
  {
    id: 3,
    image:
      "https://vanakkammarina.online/assets/popular-dishes/sweet-gulab-jamun.webp",
    name: "Pantua",
  },
  {
    id: 1,
    image:
      "https://tse2.mm.bing.net/th/id/OIP.utEwDSghE8nR68JLBhABWAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Burger",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/originals/91/bd/21/91bd210a161c445e0dfd5e77773e3193.jpg",
    name: "Juice",
  },
  {
    id: 5,
    image:
      "https://img.freepik.com/premium-photo/ramadan-food-spicy-chicken-biryani-traditional-soil-bowl_877796-806.jpg",
    name: "Biriyani",
  },
];

export default function FoodLoader({text}) {
  const duplicated = [...foods];

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-hidden">
      <div className="relative w-full h-25 overflow-hidden flex justify-center">
        <motion.div className="absolute flex items-center">
          {duplicated.map((food, index) => (
            <motion.div
              key={index}
              animate={{
                scale: [0.45, 0.6, 0.45],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <img src={food.image} alt={food.name} className="relative h-28" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
