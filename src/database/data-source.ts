import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category"
import { Specification } from "../modules/cars/entities/Specification";
import { migrations } from "./migrations"

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
