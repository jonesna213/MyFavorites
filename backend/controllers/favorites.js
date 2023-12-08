const { validationResult } = require("express-validator");
const User = require("../models/user");
const Favorite = require("../models/favorite");

/**
 * Deals with adding a favorite to the users account.
 * The request either contains errors from the validator or the data to add to the database.
 * Then creates a new favorite object and inserts it into the database and send 
 * a response.
 */
exports.addFavorite = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const userId = req.userId;
    const book = req.body.book;

    try {
        let favorite = await Favorite.findOne({"bookId" : book.bookId});
        if (!favorite) {
            favorite = new Favorite({
                bookId: book.bookId,
                authors: book.authors,
                imageLink: book.imageLink,
                identifiers: book.identifiers,
                publishedDate: book.publishedDate,
                title: book.title,
                user: userId
            });

            await favorite.save();
        }

        const user = await User.findById(userId).populate("favorites");

        user.favorites.push(favorite);

        await user.save();

        res.status(201).json({
            message: "Successfully added favorite",
            updatedFavorites: user.favorites
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.removeFavorite = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const userId = req.userId;
    const book = req.body.book;

    try {
        const user = await User.findById(userId).populate("favorites");

        user.favorites = user.favorites.filter(f => f.bookId.toString() !== book.bookId);

        await user.save();

        res.status(201).json({
            message: "Successfully removed favorite",
            updatedFavorites: user.favorites
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}