const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .normalizeEmail(),

    body("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Enter a valid password (5 or more characters)."),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords have to match!");
        }
        return true;
    }).trim(),

    body("name")
        .trim()
        .not().isEmpty()
], authController.signup);

router.post("/login", authController.login);


module.exports = router;