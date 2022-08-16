import { DataSource } from "typeorm";

import { migrations } from "./migrations"
import dontenv from "../../../configs/dotenvEntries"
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImages";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: dontenv.database.databaseUsername,
    password: dontenv.database.databasePassword,
    database: dontenv.database.databaseName,
    logging: true,
    entities: [Category, Specification, User, Car, CarImage, Rental],
    synchronize: true,
    subscribers: [],

    migrations,
})
export async function createConnection(): Promise<void> {
    try {
        await AppDataSource.initialize()
        console.log("DB connected!");
    } catch (error) {
        console.log(`Fail to connect DB - Error: ${error}`);
    }
}