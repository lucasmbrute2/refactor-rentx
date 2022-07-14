import { DataSource } from "typeorm";
import { User } from "../modules/accounts/entities/User";
import { Category } from "../modules/cars/entities/Category"
import { Specification } from "../modules/cars/entities/Specification";
import { migrations } from "./migrations"
import dontenv from "../configs/dotenvEntries"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: dontenv.database.databaseUsername,
    password: dontenv.database.databasePassword,
    database: dontenv.database.databaseName,
    synchronize: true,
    logging: true,
    entities: [Category, Specification, User],
    subscribers: [],
    migrations: [...migrations],
})
export async function createConnection(): Promise<void> {
    try {
        await AppDataSource.initialize()
        console.log("DB connected!");
    } catch (error) {
        console.log(`Fail to connect DB - Error: ${error}`);
    }
}
