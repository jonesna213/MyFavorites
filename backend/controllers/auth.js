const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const User = require("../models/user");

/**
 * This deals with signing up a user. In the request there will either be errors from express validator or
 * it will contain the email, name, and password from the user. Then attempts to insert user in database and either throws an 
 * error or send a successful response with the users id.  
 */
exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    try {
        const emailExists = await User.findOne({ email: email });
        if (emailExists) {
            const error = new Error("An account with this email already exists.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        const result = await user.save();

        res.status(201).json({
            message: "User Created!",
            userId: result._id
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * Deals with logging a user in. The request will contain the email and password passed in from the user.
 * Will then validate credentials and either throw an error or send a response containing the users id and token.
 */
exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email: email }).populate("favorites");
        if (!user) {
            const error = new Error("Invalid Credentials.");
            error.statusCode = 401;
            throw error;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            const error = new Error("Invalid Credentials.");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        }, process.env.JWT_KEY, { expiresIn: "1h" });

        res.status(200).json({
            token,
            user
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}