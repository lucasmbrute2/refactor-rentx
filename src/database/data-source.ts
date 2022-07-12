import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category"
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1654826967781 } from "./migrations/1656986536350-migrations"
import { migrations1657165082853 } from "./migrations/1657165082853-migrations"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [Category, Specification],
    subscribers: [],
    migrations: [CreateCategories1654826967781, migrations1657165082853],
})
export async function createConnection(): Promise<void> {
    try {
        await AppDataSource.initialize()
        console.log("DB connected!");
    } catch (error) {
        console.log(`Fail to connect DB - Error: ${error}`);
    }
}
