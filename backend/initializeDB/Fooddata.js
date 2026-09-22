const foodData = [
  {
    name: "Chicken Butter Masala",
    price: 180,
    quantity: 1,
    unit: "piece",
    servingQuantity: 4,
    description:
      "Tender chicken pieces cooked in a rich and creamy buttery tomato gravy blended with aromatic spices and a delicate touch of sweetness. The smooth, flavorful sauce perfectly coats the juicy chicken, creating a comforting and indulgent dish. Best enjoyed with naan, roti, paratha or fragrant steamed rice.",
    image:
      "https://static.toiimg.com/thumb/53205522.cms?imgsize=302803&width=800&height=800",
    category: "6a24563e4455c6acad6ab21a",
    available: true,
    tag: "trending",
  },
  {
    name: "Chicken Biryani",
    price: 180,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "Fragrant basmati rice layered with tender chicken, aromatic whole spices, herbs and flavorful seasoning, then slow-cooked to allow every grain to absorb the rich flavors. Served hot for the best experience, this hearty biryani makes a satisfying complete meal and is perfect for lunch, dinner or special occasions.",
    image:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg",
    category: "6a24563e4455c6acad6ab21a",
    available: true,
    tag: "popular",
  },
  {
    name: "Chicken Korma",
    price: 180,
    quantity: 1,
    unit: "piece",
    servingQuantity: 4,
    description:
      "Tender chicken pieces gently cooked in a rich and creamy gravy prepared with yogurt, ground nuts and mild aromatic spices. The smooth sauce offers a delicate balance of sweetness and savory flavors without excessive heat. A comforting North Indian-style preparation that pairs beautifully with rice, roti, naan or paratha.",
    image:
      "https://static.toiimg.com/thumb/83006933.cms?imgsize=1775884&width=800&height=800",
    category: "6a24563e4455c6acad6ab21a",
    available: true,
    tag: "trending",
  },
  {
    name: "Chicken Tikka Masala",
    price: 220,
    quantity: 1,
    unit: "piece",
    servingQuantity: 6,
    description:
      "Juicy chicken pieces marinated with aromatic spices and yogurt, grilled until lightly charred and smoky, then served with a rich and flavorful masala. The combination of tender grilled chicken and spiced gravy creates a satisfying taste. Perfect with naan, roti, paratha or fragrant steamed rice for a complete meal.",
    image:
      "https://static.toiimg.com/thumb/53206247.cms?imgsize=295868&width=800&height=800",
    category: "6a24563e4455c6acad6ab21a",
    available: true,
    tag: "trending",
  },
  {
    name: "Chicken Curry",
    price: 150,
    quantity: 1,
    unit: "piece",
    servingQuantity: 4,
    description:
      "A classic chicken curry prepared with tender chicken pieces, onions, tomatoes and a flavorful blend of traditional Indian spices. Slow-cooked to allow the chicken to absorb the rich gravy, this comforting dish offers a balanced savory taste. Best enjoyed with steamed rice, roti, paratha or naan for a satisfying meal.",
    image:
      "https://www.tamingtwins.com/wp-content/uploads/2026/07/EasyChickenCurry3.jpg",
    category: "6a24563e4455c6acad6ab21a",
    available: true,
    tag: "popular",
  },
  {
    name: "Chicken Fried Rice",
    price: 140,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "Fragrant rice stir-fried with tender chicken pieces, fresh vegetables, spring onions and flavorful Indo-Chinese seasonings. Each grain is cooked to remain light and separate while absorbing the delicious savory flavors. A satisfying standalone meal that is perfect for lunch, dinner or pairing with your favorite Indo-Chinese side dish.",
    image:
      "https://www.kitchensanctuary.com/wp-content/uploads/2020/04/Chicken-Fried-Rice-square-FS-.jpg",
    category: "6a24563e4455c6acad6ab21a",
    available: true,
    tag: "trending",
  },
  {
    name: "Chicken Manchurian",
    price: 160,
    quantity: 1,
    unit: "piece",
    servingQuantity: 6,
    description:
      "Crispy chicken pieces coated in a flavorful Indo-Chinese sauce combining spicy, tangy and savory notes. Prepared with aromatic garlic, ginger, sauces and fresh vegetables, this popular starter delivers bold flavors in every bite. Perfect as an appetizer or served alongside fried rice and noodles for a satisfying meal.",
    image:
      "https://www.chilitochoc.com/wp-content/uploads/2024/11/chicken-manchurian-with-sauce-gravy.jpg",
    category: "6a24563e4455c6acad6ab21a",
    available: true,
    tag: "high-rated",
  },
  {
    name: "Chicken Lollipop",
    price: 180,
    quantity: 1,
    unit: "piece",
    servingQuantity: 6,
    description:
      "Juicy chicken wings carefully shaped, marinated with aromatic spices and deep-fried until golden and crunchy. The crispy exterior surrounds tender, flavorful chicken, making every bite satisfying. Served as a popular Indo-Chinese starter, it is perfect for sharing with friends and pairs wonderfully with spicy dips and sauces.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXUXqGstvUzkPtik9Hp3wm8jT7Jhn-zFnDQItkawctB0tZ-QnQRktz57Ef&s=10",
    category: "6a24563e4455c6acad6ab21a",
    available: true,
    tag: "trending",
  },
  {
    name: "Chicken Shawarma",
    price: 130,
    quantity: 1,
    unit: "roll",
    servingQuantity: 1,
    description:
      "Succulent seasoned chicken wrapped in soft flatbread together with fresh vegetables, creamy sauces and flavorful herbs. The combination of tender chicken, crunchy vegetables and smooth dressing creates a delicious handheld meal. Perfect for a quick lunch, evening snack or satisfying meal when you want something flavorful and convenient.",
    image:
      "https://foxeslovelemons.com/wp-content/uploads/2023/06/Chicken-Shawarma-8.jpg",
    category: "6a24563e4455c6acad6ab21a",
    available: true,
    tag: "trending",
  },
  {
    name: "Chicken Roast",
    price: 240,
    quantity: 1,
    unit: "half",
    servingQuantity: 1,
    description:
      "Tender chicken slowly roasted with aromatic herbs, spices and flavorful seasoning until beautifully browned and juicy. The roasting process develops a delicious smoky aroma and rich savory taste while keeping the meat tender. A satisfying choice for lunch or dinner, perfect with rice, salad, roasted vegetables or bread.",
    image:
      "https://sinfullyspicy.com/wp-content/uploads/2024/11/1200-by-1200-images-1.jpg",
    category: "6a24563e4455c6acad6ab21a",
    available: true,
    tag: "popular",
  },
  {
    name: "Chicken Pakora",
    price: 120,
    quantity: 1,
    unit: "piece",
    servingQuantity: 8,
    description:
      "Tender boneless chicken pieces coated in a flavorful gram flour batter seasoned with aromatic spices and deep-fried until golden and crispy. Crunchy on the outside and juicy inside, these pakoras make a delicious evening snack or starter. Best enjoyed hot with mint chutney, tomato sauce or your favorite dip.",
    image:
      "https://www.kitchensanctuary.com/wp-content/uploads/2020/08/Chicken-Pakoras-square-FS-62.jpg",
    category: "6a24563e4455c6acad6ab21a",
    available: true,
    tag: "trending",
  },
  {
    name: "Mutton Rogan Josh",
    price: 280,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "Tender mutton slowly cooked in a rich Kashmiri-style gravy infused with aromatic spices and traditional seasoning. The meat becomes wonderfully tender while absorbing the deep flavors of the sauce. Rich, warming and satisfying, this classic preparation pairs beautifully with steamed rice, roti, naan or fragrant basmati rice.",
    image:
      "https://static.toiimg.com/thumb/53192600.cms?width=800&height=800&imgsize=418831",
    category: "6a24563e4455c6acad6ab219",
    available: true,
    tag: "chefchoice",
  },
  {
    name: "Mutton Kosha",
    price: 260,
    quantity: 1,
    unit: "plate",
    servingQuantity: 2,
    description:
      "A classic Bengali-style mutton preparation slow-cooked with caramelized onions, aromatic spices and a rich, flavorful gravy. The tender mutton absorbs the deep flavors of the spices while maintaining a deliciously juicy texture. Perfect with steamed rice, roti or paratha, this hearty dish is ideal for a satisfying traditional meal.",
    image: "https://machhlibabafries.com/wp-content/uploads/mutton-kosha.jpg",
    category: "6a24563e4455c6acad6ab219",
    available: true,
    tag: "popular",
  },
  {
    name: "Mutton Biryani",
    price: 280,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "Fragrant basmati rice layered with tender mutton, aromatic whole spices and delicate herbs, creating a rich and flavorful biryani. Each grain of rice is infused with the delicious aroma of slow-cooked meat and spices. A satisfying complete meal for anyone craving authentic, hearty and aromatic mutton biryani.",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/059/003/393/small/a-clay-bowl-filled-with-rice-and-meat-photo.jpg",
    category: "6a24563e4455c6acad6ab219",
    available: true,
    tag: "bestseller",
  },
  {
    name: "Mutton Korma",
    price: 260,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "Tender pieces of mutton slowly simmered in a rich, creamy gravy prepared with aromatic spices, yogurt and a delicate nut-based blend. The smooth gravy offers a mildly rich and flavorful taste that pairs beautifully with rice, roti or naan. A luxurious choice for a satisfying non-vegetarian meal.",
    image:
      "https://static.toiimg.com/thumb/52554168.cms?imgsize=572669&width=800&height=800",
    category: "6a24563e4455c6acad6ab219",
    available: true,
    tag: "trending",
  },
  {
    name: "Mutton Keema",
    price: 220,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "Finely minced mutton cooked with fresh peas, onions, tomatoes and a flavorful blend of traditional Indian spices. The keema develops a rich, savory taste while remaining tender and juicy. Perfect with roti, paratha, naan or rice, this comforting dish makes a delicious and filling non-vegetarian meal.",
    image:
      "https://yummyindiankitchen.com/wp-content/uploads/2016/01/mutton-keema.jpg",
    category: "6a24563e4455c6acad6ab219",
    available: true,
    tag: "recommended",
  },
  {
    name: "Tomato Soup",
    price: 80,
    quantity: 1,
    unit: "bowl",
    servingQuantity: 1,
    description:
      "Warm and comforting tomato soup prepared with ripe tomatoes, delicate herbs and freshly ground black pepper. Smooth, lightly creamy and pleasantly tangy, it makes a perfect starter before a hearty meal. Served hot, this classic soup offers a refreshing balance of sweet tomato flavor, gentle seasoning and creamy texture.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
    category: "6a24563e4455c6acad6ab21c",
    available: true,
    tag: "popular",
  },
  {
    name: "Sweet Corn Soup",
    price: 100,
    quantity: 1,
    unit: "bowl",
    servingQuantity: 1,
    description:
      "A comforting soup prepared with sweet corn kernels, fresh vegetables and a flavorful vegetable broth. Naturally sweet, lightly seasoned and pleasantly warm, it offers a delicious combination of texture and flavor. A popular vegetarian starter that is perfect for beginning a meal or enjoying as a light and satisfying snack.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/sweet-corn-soup-recipe.jpg",
    category: "6a24563e4455c6acad6ab21c",
    available: true,
    tag: "trending",
  },
  {
    name: "Chicken Manchow Soup",
    price: 120,
    quantity: 1,
    unit: "bowl",
    servingQuantity: 1,
    description:
      "A flavorful Indo-Chinese chicken soup prepared with tender chicken, fresh vegetables, aromatic spices and a delicious spicy broth. Topped with crispy fried noodles for extra crunch, this warming soup combines spicy, savory and tangy flavors. A perfect starter for anyone who enjoys bold flavors and hearty chicken-based soups.",
    image:
      "https://sinfullyspicy.com/wp-content/uploads/2023/12/1200-by-1200-images-1.jpg",
    category: "6a24563e4455c6acad6ab21c",
    available: true,
    tag: "bestseller",
  },
  {
    name: "Hot And Sour Soup",
    price: 100,
    quantity: 1,
    unit: "bowl",
    servingQuantity: 1,
    description:
      "A flavorful Indo-Chinese soup combining spicy and tangy flavors with fresh vegetables, aromatic seasoning and a savory broth. Served hot, it delivers a satisfying contrast of heat and sourness in every spoonful. A popular starter that pairs wonderfully with noodles, fried rice or other Indo-Chinese dishes.",
    image:
      "https://www.cookingcarnival.com/wp-content/uploads/2023/09/Hot-and-sour-soup-4.jpg",
    category: "6a24563e4455c6acad6ab21c",
    available: true,
    tag: "chefchoice",
  },
  {
    name: "Cream Of Chicken Soup",
    price: 110,
    quantity: 1,
    unit: "bowl",
    servingQuantity: 1,
    description:
      "A rich and comforting chicken soup prepared with tender chicken and creamy ingredients for a smooth, velvety texture. Mildly seasoned with aromatic herbs, it offers a deliciously savory and satisfying flavor. Served hot, this creamy soup is an excellent starter or light meal for chicken lovers.",
    image:
      "https://www.licious.in/blog/wp-content/uploads/2020/12/Cream-of-chicken-Soup.jpg",
    category: "6a24563e4455c6acad6ab21c",
    available: true,
    tag: "popular",
  },
  {
    name: "French Fries",
    price: 100,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "Golden and crispy potato fries prepared fresh and seasoned with a flavorful blend of spices. Crisp on the outside and soft inside, they make a perfect snack or side dish. Served hot and delicious, these fries pair wonderfully with burgers, sandwiches, wraps or your favorite dipping sauce.",
    image:
      "https://www.allrecipes.com/thmb/MGg1BbKT_QPvNZ-dk006dUGw6vM=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/50223-homemade-crispy-seasoned-french-fries-VAT-Beauty-4x3-789ecb2eaed34d6e879b9a93dd56a50a.jpg",
    category: "6a24563e4455c6acad6ab21d",
    available: true,
    tag: "bestseller",
  },
  {
    name: "Chicken Nuggets",
    price: 150,
    quantity: 1,
    unit: "piece",
    servingQuantity: 6,
    description:
      "Tender bite-sized chicken pieces coated in a crispy golden crumb and fried until perfectly crunchy. Served with a delicious dipping sauce for extra flavor, these nuggets are ideal as a starter, snack or quick meal. A family-friendly favorite offering a satisfying combination of juicy chicken and crispy coating.",
    image:
      "https://www.allrecipes.com/thmb/Dw_WFOvCds43ksPxkrE60qxcwSk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-8849-HomemadeChickenNuggets-beauty-4x3-ca915ee936054272af1b506181923c7f.jpg",
    category: "6a24563e4455c6acad6ab21d",
    available: true,
    tag: "popular",
  },
  {
    name: "Veg Spring Roll",
    price: 120,
    quantity: 1,
    unit: "piece",
    servingQuantity: 4,
    description:
      "Crispy golden spring rolls filled with a flavorful combination of fresh vegetables, aromatic herbs and mild spices. Fried until perfectly crunchy on the outside while keeping the vegetable filling deliciously tender inside. A tasty vegetarian starter or evening snack that pairs perfectly with sweet chili or spicy dipping sauce.",
    image:
      "https://d1mxd7n691o8sz.cloudfront.net/static/recipe/recipe/2023-12/Vegetable-Spring-Rolls-2-1-906001560ca545c8bc72baf473f230b4_thumbnail_170.jpeg",
    category: "6a24563e4455c6acad6ab21d",
    available: true,
    tag: "trending",
  },
  {
    name: "Paneer Tikka",
    price: 180,
    quantity: 1,
    unit: "piece",
    servingQuantity: 6,
    description:
      "Soft and juicy paneer cubes marinated in a flavorful spiced yogurt mixture and grilled until lightly charred. Served with fresh vegetables and aromatic seasoning, this popular Indian starter combines smoky grilled flavors with creamy paneer. A delicious vegetarian choice for sharing or enjoying as a satisfying appetizer.",
    image:
      "https://spicecravings.com/wp-content/uploads/2020/10/Paneer-Tikka-Featured-1.jpg",
    category: "6a24563e4455c6acad6ab21d",
    available: true,
    tag: "chefchoice",
  },
  {
    name: "Chicken Popcorn",
    price: 160,
    quantity: 1,
    unit: "piece",
    servingQuantity: 10,
    description:
      "Small, tender pieces of chicken coated in a crispy seasoned crust and fried until golden and crunchy. Packed with savory flavor and perfect for dipping, these bite-sized chicken pieces make an excellent starter or snack. Ideal for sharing with friends or enjoying as a quick and satisfying evening treat.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/popcorn-chicken-recipe.jpg",
    category: "6a24563e4455c6acad6ab21d",
    available: true,
    tag: "Customer Favorite",
  },
  {
    name: "Chocolate Brownie",
    price: 90,
    quantity: 1,
    unit: "piece",
    servingQuantity: 1,
    description:
      "A rich and indulgent chocolate brownie with a soft, fudgy center and deliciously chocolatey flavor. Baked to create a slightly crisp outer layer while keeping the inside moist and gooey, this classic dessert is perfect for chocolate lovers. Enjoy it on its own or pair it with ice cream.",
    image:
      "https://icecreambakery.in/wp-content/uploads/2024/12/Brownie-Recipe-with-Cocoa-Powder-1200x900.jpg",
    category: "6a24563e4455c6acad6ab21e",
    available: true,
    tag: "popular",
  },
  {
    name: "Vanilla Ice Cream",
    price: 60,
    quantity: 1,
    unit: "scoop",
    servingQuantity: 1,
    description:
      "Classic creamy vanilla ice cream prepared with a smooth texture and delicate vanilla flavor. Cool, refreshing and lightly sweet, it is a timeless dessert that pairs beautifully with brownies, cakes or chocolate desserts. A simple and satisfying choice for anyone looking for a chilled sweet treat after a meal.",
    image:
      "https://static.toiimg.com/thumb/54677722.cms?imgsize=134423&width=800&height=800",
    category: "6a24563e4455c6acad6ab21e",
    available: true,
    tag: "trending",
  },
  {
    name: "Chocolate Lava Cake",
    price: 120,
    quantity: 1,
    unit: "piece",
    servingQuantity: 1,
    description:
      "A warm and indulgent chocolate cake with a soft, rich exterior and a delicious molten chocolate center that flows beautifully when cut. Served warm for the best experience, this decadent dessert is perfect for chocolate lovers and makes a wonderful finishing touch to any lunch or dinner.",
    image:
      "https://www.crowdedkitchen.com/wp-content/uploads/2026/02/Chocolate-Lava-Cakes-11.jpg",
    category: "6a24563e4455c6acad6ab21e",
    available: true,
    tag: "bestseller",
  },
  {
    name: "Strawberry Cheesecake",
    price: 140,
    quantity: 1,
    unit: "piece",
    servingQuantity: 1,
    description:
      "A creamy and indulgent cheesecake with a smooth, rich texture topped with delicious strawberry glaze. The sweet and slightly tangy strawberry topping perfectly complements the buttery cheesecake base. A delightful dessert choice for anyone who enjoys fruity flavors, creamy textures and a luxurious finish after a satisfying meal.",
    image:
      "https://www.elmundoeats.com/wp-content/uploads/2024/06/A-portion-of-no-bake-strawberry-cheesecake.jpg",
    category: "6a24563e4455c6acad6ab21e",
    available: true,
    tag: "chefchoice",
  },
  {
    name: "Tiramisu",
    price: 150,
    quantity: 1,
    unit: "piece",
    servingQuantity: 1,
    description:
      "A classic Italian-inspired dessert featuring soft coffee-soaked layers combined with creamy mascarpone and a delicate cocoa finish. Rich coffee notes balance the smooth sweetness of the cream, creating a luxurious dessert experience. Perfect for coffee lovers looking for an elegant, creamy and indulgent treat after their meal.",
    image:
      "https://www.bunsenburnerbakery.com/wp-content/uploads/2016/06/easy-tiramisu-square-29-735x735.jpg",
    category: "6a24563e4455c6acad6ab21e",
    available: true,
    tag: "recommended",
  },
  {
    name: "Rasgulla",
    price: 25,
    quantity: 1,
    unit: "piece",
    servingQuantity: 2,
    description:
      "Soft and spongy Bengali-style rasgulla made from delicate cottage cheese dumplings soaked in light, fragrant sugar syrup. Juicy and refreshing with every bite, this traditional sweet offers a wonderful balance of softness and sweetness. A timeless Bengali dessert that is perfect for celebrations or after-meal indulgence.",
    image:
      "https://www.kuchpakrahahai.in/wp-content/uploads/2020/05/Rasgulla-2BRecipe-2Bin-2BPressure-2BCooker-e1626148996679.jpg",
    category: "6a24563e4455c6acad6ab21f",
    available: true,
    tag: "popular",
  },
  {
    name: "Gulab Jamun",
    price: 30,
    quantity: 1,
    unit: "piece",
    servingQuantity: 2,
    description:
      "Soft and delicious milk-based dumplings gently fried until golden and then soaked in warm, fragrant sugar syrup. Infused with subtle cardamom flavors, each bite is rich, juicy and comforting. A classic Indian dessert loved for its melt-in-the-mouth texture and satisfying sweetness after a hearty meal.",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2022/10/gulab-jamun-recipe-01.jpg",
    category: "6a24563e4455c6acad6ab21f",
    available: true,
    tag: "bestseller",
  },
  {
    name: "Rasmalai",
    price: 100,
    quantity: 1,
    unit: "piece",
    servingQuantity: 7,
    description:
      "Soft and delicate cottage cheese patties soaked in rich, creamy milk flavored with saffron, cardamom and aromatic spices. The smooth texture and mildly sweet flavor create a luxurious dessert experience. Served chilled, this traditional Indian sweet is perfect for celebrations, special occasions or a delicious post-meal treat.",
    image:
      "https://eatsbyramya.com/wp-content/uploads/2024/10/rasmalai_can_recipe.jpg",
    category: "6a24563e4455c6acad6ab21f",
    available: true,
    tag: "chefchoice",
  },
  {
    name: "Jalebi",
    price: 50,
    quantity: 1,
    unit: "piece",
    servingQuantity: 4,
    description:
      "Golden and crispy spiral-shaped jalebi freshly prepared and soaked in fragrant sugar syrup. Its crunchy exterior and juicy, syrup-filled center create a delightful contrast in every bite. A popular Indian sweet that pairs wonderfully with meals, tea or festive occasions and is perfect for satisfying a sweet craving.",
    image: "https://static.toiimg.com/thumb/53099699.cms?width=1200&height=900",
    category: "6a24563e4455c6acad6ab21f",
    available: true,
    tag: "trending",
  },
  {
    name: "Kaju Katli",
    price: 80,
    quantity: 1,
    unit: "piece",
    servingQuantity: 4,
    description:
      "A delicate Indian cashew fudge prepared with finely ground cashews and sugar, offering a smooth, rich and melt-in-the-mouth texture. Lightly sweet and beautifully refined, Kaju Katli is a timeless festive favorite. Perfect for celebrations, gifting or enjoying as an elegant dessert after a satisfying meal.",
    image: "https://static.toiimg.com/photo/55048826.cms",
    category: "6a24563e4455c6acad6ab21f",
    available: true,
    tag: "Customer Favorite",
  },
  {
    name: "Fish Finger",
    price: 220,
    quantity: 1,
    unit: "piece",
    servingQuantity: 6,
    description:
      "Crispy golden fish fingers prepared with tender, flavorful fish coated in a crunchy seasoned crust and fried until perfectly golden. Served with tangy tartar sauce for a refreshing contrast, they make an excellent starter or evening snack. A delicious choice for seafood lovers looking for a crispy and satisfying bite.",
    image:
      "https://www.recipetineats.com/tachyon/2020/01/Fish-Fingers_5.jpg?resize=500%2C500",
    category: "6a24563e4455c6acad6ab21d",
    available: true,
    tag: "popular",
  },
  {
    name: "Garlic Bread",
    price: 120,
    quantity: 1,
    unit: "piece",
    servingQuantity: 4,
    description:
      "Warm, freshly toasted bread generously spread with creamy garlic butter, aromatic herbs and a light touch of seasoning. Baked until golden and crisp on the outside while remaining soft inside, this flavorful side is perfect for sharing. A delicious accompaniment to soups, pizzas, pasta or your favorite evening meal.",
    image:
      "https://www.mygingergarlickitchen.com/wp-content/rich-markup-images/1x1/1x1-garlic-bread.jpg",
    category: "6a24563e4455c6acad6ab21d",
    available: true,
    tag: "trending",
  },
  {
    name: "Mushroom Soup",
    price: 90,
    quantity: 1,
    unit: "bowl",
    servingQuantity: 1,
    description:
      "A warm and comforting mushroom soup prepared with fresh mushrooms, creamy ingredients and delicate herbs. Its smooth texture and rich savory flavor make it a perfect starter on any occasion. Served hot, this wholesome soup offers a delicious balance of earthy mushroom flavors and gentle seasoning in every spoonful.",
    image:
      "https://images.themodernproper.com/production/posts/2019/HungarianMushroomSoup_10.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1764083909&s=3a8c4983db0a39bb9a98c23e2d49b185",
    category: "6a24563e4455c6acad6ab21c",
    available: true,
    tag: "recommended",
  },
  {
    name: "Falooda",
    price: 90,
    quantity: 1,
    unit: "glass",
    servingQuantity: 1,
    description:
      "A refreshing and indulgent falooda layered with silky vermicelli, chilled sweet milk, basil seeds and creamy ice cream. Topped with delicious garnishes for extra texture and flavor, this classic dessert drink is perfect for cooling down on a warm day or enjoying as a sweet treat after a meal.",
    image:
      "https://www.thedeliciouscrescent.com/wp-content/uploads/2020/02/Falooda-Square.jpg",
    category: "6a24563e4455c6acad6ab21e",
    available: true,
    tag: "popular",
  },
  {
    name: "Rabri",
    price: 100,
    quantity: 1,
    unit: "bowl",
    servingQuantity: 5,
    description:
      "Rich and creamy rabri prepared by slowly reducing milk until it develops a thick, luxurious texture. Delicately flavored with cardamom and garnished with crunchy nuts, this traditional Indian dessert offers a rich milky sweetness. Perfect served chilled as a satisfying dessert after lunch or dinner.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/08/rabri-rabdi-recipe.jpg",
    category: "6a24563e4455c6acad6ab21f",
    available: true,
    tag: "chefchoice",
  },
  {
    name: "Cold Coffee",
    price: 80,
    quantity: 1,
    unit: "glass",
    servingQuantity: 1,
    description:
      "Smooth and refreshing chilled coffee blended with creamy milk, ice cream and a touch of sweetness. Rich coffee flavor combined with a cool, velvety texture makes this drink a perfect choice for coffee lovers. Served chilled, it is ideal for an afternoon refreshment or a sweet post-meal treat.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4F3czbgSTLBNR46JutuM9tg09Im2ZXAHzwpfN3ZhpYQ&s=10",
    category: "6a24563e4455c6acad6ab21b",
    available: true,
    tag: "bestseller",
  },
  {
    name: "Mango Shake",
    price: 90,
    quantity: 1,
    unit: "glass",
    servingQuantity: 1,
    description:
      "Thick and creamy mango shake prepared with ripe juicy mangoes, chilled milk and a touch of sweetness. Naturally fruity and refreshing, it delivers the rich flavor of fresh mangoes in every sip. A perfect summer drink for cooling down, enjoying with snacks or finishing a delicious meal.",
    image: "https://thumbs.dreamstime.com/b/mango-shake-22613254.jpg",
    category: "6a24563e4455c6acad6ab21b",
    available: true,
    tag: "popular",
  },
  {
    name: "Chocolate Milkshake",
    price: 90,
    quantity: 1,
    unit: "glass",
    servingQuantity: 1,
    description:
      "A rich and creamy chocolate milkshake blended with smooth milk, delicious cocoa and a touch of sweetness. Finished with a generous layer of whipped cream, this indulgent drink is perfect for chocolate lovers. Enjoy it as a refreshing snack, dessert drink or satisfying treat at any time of day.",
    image:
      "https://dinnersdishesanddesserts.com/wp-content/uploads/2018/06/Chocolate-Milkshakes-square.jpg",
    category: "6a24563e4455c6acad6ab21b",
    available: true,
    tag: "trending",
  },
  {
    name: "Fresh Lime Soda",
    price: 70,
    quantity: 1,
    unit: "glass",
    servingQuantity: 1,
    description:
      "Chilled lime soda prepared with freshly squeezed lime, sparkling soda and a refreshing balance of sweet and tangy flavors. Light, fizzy and incredibly refreshing, it is an excellent choice for hot afternoons or alongside a hearty meal. A simple classic beverage that delivers freshness and flavor in every sip.",
    image:
      "https://sattvakitchen.com/wp-content/uploads/2024/05/SWEET-LIME-SODA-shutterstock_2309599743-copy-Copy-copy.jpg",
    category: "6a24563e4455c6acad6ab21b",
    available: true,
    tag: "Customer Favorite",
  },
  {
    name: "Watermelon Juice",
    price: 80,
    quantity: 1,
    unit: "glass",
    servingQuantity: 1,
    description:
      "Freshly prepared watermelon juice made from naturally sweet and juicy watermelon, served chilled for maximum refreshment. Light, hydrating and packed with fresh fruity flavor, it is an excellent choice for warm days. Enjoy this naturally refreshing drink with your meal or as a delicious afternoon thirst quencher.",
    image:
      "https://www.thedeliciouscrescent.com/wp-content/uploads/2019/05/Watermelon-Juice-Square.jpg",
    category: "6a24563e4455c6acad6ab21b",
    available: true,
    tag: "recommended",
  },
  {
    name: "Masala Chaas",
    price: 60,
    quantity: 1,
    unit: "glass",
    servingQuantity: 1,
    description:
      "Chilled and refreshing spiced buttermilk blended with roasted cumin, fresh herbs, mild spices and a touch of salt. Light, cooling and flavorful, it is an excellent accompaniment to a hearty meal or a refreshing drink on a warm day. A simple traditional beverage with a delicious savory taste.",
    image:
      "https://thumbs.dreamstime.com/b/buttermilk-indian-drink-masala-chaas-savory-india-143035969.jpg",
    category: "6a24563e4455c6acad6ab21b",
    available: true,
    tag: "popular",
  },
  {
    name: "Lassi",
    price: 70,
    quantity: 1,
    unit: "glass",
    servingQuantity: 1,
    description:
      "Smooth, creamy and refreshing yogurt-based lassi prepared with chilled curd and a touch of sweetness. Its rich texture and mildly sweet flavor make it a perfect companion for spicy meals or a refreshing standalone drink. Served chilled, this classic Indian beverage is delicious, satisfying and wonderfully refreshing.",
    image:
      "https://www.sharmispassions.com/wp-content/uploads/2023/08/sweet-lassi5.jpg",
    category: "6a24563e4455c6acad6ab21b",
    available: true,
    tag: "chefchoice",
  },
  {
    name: "Mixed Fruit Juice",
    price: 100,
    quantity: 1,
    unit: "glass",
    servingQuantity: 1,
    description:
      "A refreshing blend of carefully selected seasonal fruits combined to create a naturally sweet and vibrant drink. Packed with fruity flavors and served chilled, this colorful juice is perfect for breakfast, lunch or an afternoon refreshment. A delicious choice for anyone looking for a fresh and fruity beverage.",
    image:
      "https://www.jeyashriskitchen.com/wp-content/uploads/2023/05/IMG_0594-001.jpg",
    category: "6a24563e4455c6acad6ab21b",
    available: true,
    tag: "trending",
  },
  {
    name: "Veg Thali",
    price: 150,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "A wholesome vegetarian platter featuring fragrant steamed rice, soft roti, flavorful dal, seasonal vegetables and a delicious sweet dessert. Carefully balanced to provide a satisfying complete meal, this thali combines comforting homestyle flavors with generous variety. Perfect for lunch or dinner when you want a filling vegetarian meal.",
    image: "https://kitchencloud.in/wp-content/uploads/2024/12/Veg-Thali.jpg",
    category: "6a24563e4455c6acad6ab222",
    available: true,
    tag: "bestseller",
  },
  {
    name: "Special Veg Thali",
    price: 220,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "A premium vegetarian thali offering a generous variety of flavorful curries, dal, rice, roti, seasonal vegetables, accompaniments and a sweet dessert. Prepared for a more indulgent dining experience, this special platter brings together multiple textures and rich flavors in one satisfying and complete vegetarian meal.",
    image:
      "https://skydecklounge.in/wp-content/uploads/2022/01/Sky-Deck-Special-Thali.jpg",
    category: "6a24563e4455c6acad6ab222",
    available: true,
    tag: "popular",
  },
  {
    name: "Chicken Thali",
    price: 180,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "A wholesome chicken thali featuring flavorful chicken curry served with steamed rice, soft roti and delicious side dishes. Carefully prepared with aromatic spices, this satisfying combination offers a balanced mix of savory, comforting flavors. Perfect for lunch or dinner when you want a complete and filling non-vegetarian Bengali-style meal.",
    image:
      "https://png.pngtree.com/thumb_back/fh260/background/20260522/pngtree-authentic-bangladeshi-chicken-curry-rice-thali-food-photography-image_21848675.webp",
    category: "6a24563e4455c6acad6ab222",
    available: true,
    tag: "trending",
  },
  {
    name: "Mutton Thali",
    price: 250,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "A rich and satisfying mutton thali served with tender mutton curry, fragrant steamed rice, soft roti and traditional accompaniments. The slow-cooked mutton is infused with aromatic spices for a deep, delicious flavor. A hearty choice for anyone looking for a traditional and indulgent non-vegetarian complete meal.",
    image:
      "https://dukaan.b-cdn.net/700x700/webp/4539168/f082ccb7-fea3-465d-8989-aec53389880c/1622272823944-6aa16145-12e9-483c-ba94-a031a3f519aa.jpeg",
    category: "6a24563e4455c6acad6ab222",
    available: true,
    tag: "chefchoice",
  },
  {
    name: "Fish Thali",
    price: 170,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "A classic Bengali-inspired fish thali featuring flavorful fish curry, steamed rice and delicious traditional side dishes. The fish is gently cooked in a fragrant spiced gravy that pairs perfectly with warm rice. A comforting and satisfying choice for anyone who enjoys authentic Bengali flavors in a complete meal.",
    image:
      "https://mughaldarbarbelur.in/wp-content/uploads/2025/08/generated-imag-19.jpeg",
    category: "6a24563e4455c6acad6ab222",
    available: true,
    tag: "Customer Favorite",
  },

  {
    name: "Chicken Meal",
    price: 160,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "A satisfying chicken meal featuring flavorful chicken curry served with steamed rice and fresh salad. The tender chicken is cooked with aromatic spices to create a rich and comforting taste. A simple yet filling option for lunch or dinner, perfect for anyone craving a delicious everyday non-vegetarian meal.",
    image:
      "https://hometestedrecipes.blog/wp-content/uploads/2026/04/Creamy-Smothered-Chicken-and-Rice.jpg",
    category: "6a24563e4455c6acad6ab221",
    available: true,
    tag: "popular",
  },
  {
    name: "Veg Meal",
    price: 120,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "A wholesome vegetarian meal featuring steamed rice, dal, seasonal mixed vegetables and a simple homestyle preparation. Carefully balanced with comforting flavors and satisfying portions, this meal is perfect for a complete everyday lunch or dinner. A delicious and affordable choice for anyone looking for a filling vegetarian meal.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/instant-pot-dal-rice-recipe.jpg",
    category: "6a24563e4455c6acad6ab221",
    available: true,
    tag: "trending",
  },
  {
    name: "Paneer Meal",
    price: 160,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "A satisfying vegetarian meal served with flavorful paneer curry, steamed rice, soft roti and fresh salad. The creamy paneer preparation pairs beautifully with the rice and roti, creating a balanced and filling combination. Perfect for lunch or dinner when you want something rich, comforting and delicious.",
    image:
      "https://punjabibyflavor.com/cdn/shop/files/PunjabibyFlavor-PaneerMakhaniRice.jpg?v=1706822268",
    category: "6a24563e4455c6acad6ab221",
    available: true,
    tag: "recommended",
  },
  {
    name: "Fish Meal",
    price: 180,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "A comforting Bengali-style fish meal featuring flavorful fish curry served with fragrant steamed rice. The fish is cooked in a deliciously spiced gravy that complements the soft rice perfectly. A simple yet satisfying combination made for anyone who enjoys traditional homestyle flavors and a wholesome non-vegetarian meal.",
    image:
      "https://static.vecteezy.com/system/resources/previews/066/280/222/large_2x/fish-curry-with-rice-and-vegetables-on-a-white-plate-photo.jpg",
    category: "6a24563e4455c6acad6ab221",
    available: true,
    tag: "chefchoice",
  },
  {
    name: "Mutton Meal",
    price: 240,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "A hearty non-vegetarian meal featuring tender mutton cooked in a rich, aromatic curry and served with steamed rice. Slow-cooked spices bring out the deep flavor of the meat while keeping it tender and juicy. A satisfying choice for anyone craving a rich and traditional mutton meal.",
    image:
      "https://i.redd.it/homemade-mutton-curry-with-rice-could-flaunt-it-as-a-v0-ldymergt4ekd1.jpg?width=3676&format=pjpg&auto=webp&s=122a1b6b7bc4637a426914835e87da13c4320c34",
    category: "6a24563e4455c6acad6ab221",
    available: true,
    tag: "bestseller",
  },

  {
    name: "Veg Burger",
    price: 90,
    quantity: 1,
    unit: "piece",
    servingQuantity: 1,
    description:
      "A delicious vegetarian burger made with a soft toasted bun, crispy vegetable patty, fresh lettuce, onions and flavorful sauces. The combination of crunchy vegetables and savory filling makes every bite satisfying. A convenient and affordable snack that is perfect for a quick lunch, evening snack or casual meal.",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2020/12/burger-recipe-1.jpg",
    category: "6a24563e4455c6acad6ab220",
    available: true,
    tag: "popular",
  },
  {
    name: "Chicken Burger",
    price: 130,
    quantity: 1,
    unit: "piece",
    servingQuantity: 1,
    description:
      "A juicy chicken burger prepared with a flavorful chicken patty, soft toasted bun, fresh vegetables and creamy sauces. The tender chicken filling delivers a satisfying savory taste in every bite. Perfect for a quick and filling meal, especially when you are craving a delicious combination of chicken, vegetables and sauces.",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/chicken-burgers-index-667b185b5f528.jpg?crop=0.500xw:1.00xh;0.282xw,0&resize=1200:*",
    category: "6a24563e4455c6acad6ab220",
    available: true,
    tag: "bestseller",
  },
  {
    name: "Chicken Pizza",
    price: 220,
    quantity: 1,
    unit: "serving",
    servingQuantity: 1,
    description:
      "A cheesy chicken pizza topped with seasoned chicken pieces, fresh vegetables, mozzarella cheese and aromatic herbs. The crispy base, rich cheese and flavorful chicken create a delicious combination in every slice. Perfect for sharing with friends or enjoying as a satisfying meal when you want something cheesy and indulgent.",
    image:
      "https://cdn2.clevup.in/301880/ChatGPTImageJul29202608_52_09PM-1785338552388.png?width=600&format=webp",
    category: "6a24563e4455c6acad6ab220",
    available: true,
    tag: "trending",
  },
  {
    name: "Veg Pizza",
    price: 160,
    quantity: 1,
    unit: "serving",
    servingQuantity: 1,
    description:
      "A colorful vegetarian pizza loaded with fresh vegetables, mozzarella cheese and aromatic herbs over a perfectly baked crust. Every slice offers a delicious combination of cheesy richness, fresh vegetable flavors and a lightly crisp base. An excellent choice for vegetarians looking for a satisfying and flavorful pizza meal.",
    image:
      "https://www.liveeatlearn.com/wp-content/uploads/2025/09/Veggie-Pizza-12.jpg",
    category: "6a24563e4455c6acad6ab220",
    available: true,
    tag: "Customer Favorite",
  },
  {
    name: "Chicken Wrap",
    price: 120,
    quantity: 1,
    unit: "piece",
    servingQuantity: 1,
    description:
      "A soft tortilla wrap filled with juicy grilled chicken, crisp fresh vegetables and flavorful sauces. The tender chicken and crunchy vegetables create a satisfying combination wrapped in a warm tortilla. Perfect for a quick lunch, evening snack or convenient meal when you want something flavorful, filling and easy to enjoy.",
    image:
      "https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Wrap.jpg",
    category: "6a24563e4455c6acad6ab220",
    available: true,
    tag: "recommended",
  },
  {
    name: "Veg Sandwich",
    price: 80,
    quantity: 1,
    unit: "piece",
    servingQuantity: 1,
    description:
      "A freshly toasted sandwich filled with crunchy vegetables, creamy cheese and flavorful sauces between golden bread slices. Lightly toasted for a delicious crisp texture, it offers a simple yet satisfying combination of fresh and savory flavors. Ideal for breakfast, evening snacks, quick meals or a light bite.",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/veg-grilled-sandwich-recipe.jpg",
    category: "6a24563e4455c6acad6ab220",
    available: true,
    tag: "popular",
  },
  {
    name: "Loaded Nachos",
    price: 130,
    quantity: 1,
    unit: "plate",
    servingQuantity: 1,
    description:
      "Crispy golden nachos generously topped with melted cheese, fresh salsa, jalapeños and flavorful toppings. Every bite combines crunchy tortilla chips with creamy cheese and refreshing salsa for a delicious snack experience. Perfect for sharing with friends during conversations, movie nights or as a fun evening appetizer.",
    image:
      "https://dailydishrecipes.com/wp-content/uploads/2014/06/Easy-Loaded-Beef-Nachos-Featured-Image-1.jpg",
    category: "6a24563e4455c6acad6ab220",
    available: true,
    tag: "trending",
  },
];
export default foodData;
