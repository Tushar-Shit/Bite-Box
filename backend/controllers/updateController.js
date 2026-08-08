import Users from "../models/user";
import Cart from "../models/cart";
import FoodItem from "../models/foodItem";



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
            message: "Remove From Favourite",
            code: "okay",
        });
    } else {
        await Users.findByIdAndUpdate(userId, {
            $addToSet: { favourites: foodId },
        });
        res.json({
            message: "Add to Favourite",
            code: "okay",
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
    try {
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
                    if (existItem)
                        existingCart.items.pull({ foodId: cartItem.foodId });
                    else
                        existingCart.items.push(cartItem);
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
            await Cart.create({
                userId: req.user,
                items: cartItems
            });
            return res.status(200).json({
                code: "success",
                message: "Your cart is created"
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            code: "failed",
            message: "Internal Server Error"
        });
    }

}

export const updateCart = async (req, res) => {
    const { foodId, originalPrice, command } = req.body;

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