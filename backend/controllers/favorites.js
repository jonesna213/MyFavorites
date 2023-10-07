const { validationResult } = require("express-validator");
const User = require("../models/user");
const Favorite = require("../models/favorite");

exports.addFavorite = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const type = req.body.type;
    const id = req.body.id;
    const userId = req.userId;

    const newFavorite = new Favorite({
        type,
        id,
        user: userId
    });
    
    try {
        await newFavorite.save();

        const user = await User.findById(userId);

        user.favorites.push(newFavorite);
        
        await user.save();

        res.status(201).json({
            message: "Successfully added favorite"
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getFavorites = async (req, res, next) => {

}