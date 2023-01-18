const db = require("../models");
const User = db.user;

let jwt = require("jsonwebtoken");

// Add Game to user's list
exports.addGame = async (req, res) => {
    try {
        const game = {
            title: req.body.title,
            platforms: req.body.platforms,
            rating: req.body.rating
        };
        if (game.rating < 0 || game.rating > 100) {
            return res.status(500).send({ msg: "Rating must be [0, 100]." });
        }
        let userId = req.userId;
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { gamelist: game } },
            { new: true }
        );
        return res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// ************** TESTS ************
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
