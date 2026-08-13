import Users from "../models/user";
import Cart from "../models/cart";
import FoodItem from "../models/foodItem";
import Category from "../models/categories";


//gives all favourite items
export const favourite = async (req, res) => {
    const user = await Users.findById(req.user).populate("favourites");
    res.json({ favourites: user.favourites })
};


// add or remove favourite food items
export const updateFavourite = async (req, res) => {
    const { foodId } = req.body;
    const userId = req.user;
    const exists = await Users.exists({
        _id: userId,
        favourites: foodId,
    });

    if (exists) {
        await Users.findByIdAndUpdate(userId, {
            $pull: { favourites: foodId },
        });
        res.json({
            code: "okay",
            message: "Remove From Favourite",
        });
    } else {
        await Users.findByIdAndUpdate(userId, {
            $addToSet: { favourites: foodId },
        });
        res.json({
            code: "okay",
            message: "Add to Favourite",
        });
    }
};


//provide cart data
export const getCart = async (req, res) => {
    const currentUserId = req.user;
    const data = await Cart.findOne({ userId: currentUserId }).populate("items.foodId");
    if (!data || data.items.length <= 0) {
        return res.status(404).json({
            quick: "No Data Found!",
            message: "Your cart is empty...",
            code: "ND"
        });
    }
    res.json(data.items);
};


export const addAndDelete = async (req, res) => {
        const { data, command } = req.body;
        //validate data and command
        if ((!Array.isArray(data) || !data.length) || (command !== "SCA" && command !== "add/dlt")) {
            return res.status(400).json({
                code: "failed",
                message: "Request failed."
            });
        }

        //create array of IDs to find foods
        const foodIds = data.map(item => item.id);

        //extract the foods
        const foods = await FoodItem.find({ _id: { $in: foodIds } });


        //compare extracted food with given food ids
        if (foods.length !== foodIds.length) {
            return res.status(404).json({
                code: "failed",
                message: "One or more food items not found."
            });
        }

        //make pair of (id, quantity), (id, availability)
        const quantityMap = new Map(data.map(item => [item.id.toString(), item.quantity]));
        const availableMap = new Map(data.map(item => [item.id.toString(), item.available]));

        //make the final cart array which to be pushed
        const cartItems = foods.map(food => ({
            foodId: food._id,
            quantity: quantityMap.get(food._id.toString()),
            price: quantityMap.get(food._id.toString()) * food.price,
            available: availableMap.get(food._id.toString()),
        }));
        
        //check cart's existance then check each item's existance then add or delete
        const existingCart = await Cart.findOne({ userId: req.user });
        if (existingCart) {

            for (let cartItem of cartItems) {

                const existItem = existingCart.items.find(
                    item => item.foodId.toString() === cartItem.foodId.toString()
                );

                if (command === "SCA") {

                    if (existItem) {
                        existItem.quantity = cartItem.quantity;
                        existItem.price = cartItem.price;
                        existItem.available = cartItem.available;
                    } else
                        existingCart.items.push(cartItem);

                } else if (command === "add/dlt") {

                    if (existItem) {

                        const index = existingCart.items.findIndex(
                            item => item.foodId.toString() === cartItem.foodId.toString()
                        );

                        existingCart.items.splice(index, 1);
                    } else {

                        existingCart.items.push(cartItem);
                    }

                }
            }

            await existingCart.save();
            return res.status(200).json({
                code: "success",
                message: command === "SCA"
                    ? "Cart synchronized."
                    : "Cart updated."
            });
        }
        else {
            //run if cart not exist, for very new users
            const cart = await Cart.create({
                userId: req.user,
                items: cartItems
            });
            // console.log(any);
            // await Users.findByIdAndUpdate(req.user, {
            //     cart: cart._id
            // });
            return res.status(200).json({
                code: "success",
                message: "Your cart is created"
            });
        }
}

export const updateCart = async (req, res) => {
    const { foodId, originalPrice, command } = req.body;
    console.log(foodId, originalPrice, command);
    if (!foodId || (command !== "increase" && command !== "decrease")) {
        return res.status(400).json({
            code: "failed",
            message: "Request failed"
        });
    }
    const existingCart = await Cart.findOne({ userId: req.user });

    if (!existingCart) {
        return res.status(400).json({
            code: "failed",
            message: "Request failed"
        });
    }
    const item = existingCart.items.find(item => item.foodId.toString() === foodId.toString());
    if (!item) {
        return res.status(400).json({
            code: "failed",
            message: "Request failed"
        });
    }


    if (command === "increase") {
        item.quantity++;
        item.price = originalPrice * item.quantity;
    }
    else if (command === "decrease") {
        if (item.quantity === 1) {
            return;
        }
        item.quantity--;
        item.price = originalPrice * item.quantity;
    }
    await existingCart.save();
    return res.status(200).json({
        code: "success",
        message: "Item updated",
    })
}


//search mechanism
export const searchFood = async (req, res) => {
    const { text } = req.params;

    const keywords = text
        .trim()
        .split(",")
        .map(keyword => keyword.trim())
        .filter(Boolean);

    if (keywords.length === 0) {
        return res.status(400).json({
            code: "failed",
            message: "Search text is required."
        });
    }

    const conditions = keywords.flatMap(keyword => [
        {
            name: {
                $regex: keyword,
                $options: "i"
            }
        },
        {
            tag: {
                $regex: keyword,
                $options: "i"
            }
        },

    ]);

    const foods = await FoodItem.aggregate([
        // Find foods that match at least one keyword
        {
            $match: {
                $or: conditions
            }
        },

        // Calculate priority score
        {
            $addFields: {
                score: {
                    $sum: keywords.map(keyword => ({
                        $add: [
                            // Exact name match
                            {
                                $cond: [
                                    {
                                        $regexMatch: {
                                            input: "$name",
                                            regex: `^${keyword}$`,
                                            options: "i"
                                        }
                                    },
                                    100,
                                    0
                                ]
                            },

                            // Name starts with keyword
                            {
                                $cond: [
                                    {
                                        $regexMatch: {
                                            input: "$name",
                                            regex: `^${keyword}`,
                                            options: "i"
                                        }
                                    },
                                    70,
                                    0
                                ]
                            },

                            // Name contains keyword
                            {
                                $cond: [
                                    {
                                        $regexMatch: {
                                            input: "$name",
                                            regex: keyword,
                                            options: "i"
                                        }
                                    },
                                    50,
                                    0
                                ]
                            },

                            // Tag contains keyword
                            {
                                $cond: [
                                    {
                                        $regexMatch: {
                                            input: "$tag",
                                            regex: keyword,
                                            options: "i"
                                        }
                                    },
                                    30,
                                    0
                                ]
                            },
                        ]
                    }))
                }
            }
        },

        // Highest score first
        {
            $sort: {
                score: -1
            }
        }
    ]);

    if (foods.length === 0) {
        return res.status(404).json({
            code: "failed",
            message: "No food available with this name."
        });
    }

    return res.status(200).json({ foods });
};