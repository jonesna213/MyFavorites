const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    bookId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    authors: {
        type: Array,
        required: true
    },
    publishedDate: {
        type: String,
        required: true
    },
    identifiers: {
        type: Array,
        required: true
    },
    imageLink: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Favorite", favoriteSchema);