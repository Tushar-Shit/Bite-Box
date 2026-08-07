import Users from "../models/user";





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
