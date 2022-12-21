import * as mongodb from "mongodb";
import { Game } from "./game";

export const collections: {
    games?: mongodb.Collection<Game>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("Game");
    await applySchemaValidation(db);

    const gameCollection = db.collection<Game>("games");
    collections.games = gameCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our game model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "rating"],
            additionalProperties: false,
            properties: {
                _id: {},
                title: {
                    bsonType: "string",
                    description: "'title' is required and is a string",
                },
                platforms: {
                    bsonType: ["string"],
                    minItems: 1,
                    maxItems: 15,
                    description: "'platforms' is optional and is an array of strings",
                },
                rating: {
                    bsonType: "int",
                    minimum: 0,
                    maximum: 100,
                    description: "'rating' is required and must be between 100 and 0",
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "games",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("games", { validator: jsonSchema });
        }
    });
}