import * as mongodb from "mongodb"

export interface Game {
    title: string,
    platforms: [string],
    rating: number,
    _id?: mongodb.ObjectId;
}