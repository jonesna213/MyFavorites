const express = require("express");
const { body } = require("express-validator");

const recommendationsController = require("../controllers/recommendations");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/getRecommendations", isAuth, recommendationsController.getRecommendation);

module.exports = router;