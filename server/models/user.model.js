const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        gamelist: [{
            title: String,
            platforms: [String],
            rating: { type: Number, min: 0, max: 100 } // Rating 0.0 - 10.0
        }]
    })
);

module.exports = User;