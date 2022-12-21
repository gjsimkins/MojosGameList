import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const gameRouter = express.Router();
gameRouter.use(express.json());

gameRouter.get("/", async (_req, res) => {
    try {
        const games = await collections.games.find({}).toArray();
        res.status(200).send(games);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

gameRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const game = await collections.games.findOne(query);

        if (game) {
            res.status(200).send(game);
        } else {
            res.status(404).send(`Failed to find an game: ID ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find an game: ID ${req?.params?.id}`);
    }
});

gameRouter.post("/", async (req, res) => {
    try {
        const game = req.body;
        const result = await collections.games.insertOne(game);

        if (result.acknowledged) {
            res.status(201).send(`Created a new game: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new game.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

gameRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const game = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.games.updateOne(query, { $set: game });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a game: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a game: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a game: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

gameRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.games.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a game: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a game: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a game: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});