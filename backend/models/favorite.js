const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    
});

module.exports = mongoose.model("Favorite", favoriteSchema);