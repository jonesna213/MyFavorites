const express = require("express");
const { body } = require("express-validator");

const favoritesController = require("../controllers/favorites");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/addFavorite", isAuth, favoritesController.addFavorite);

router.post("/removeFavorite", isAuth, favoritesController.removeFavorite);

module.exports = router;