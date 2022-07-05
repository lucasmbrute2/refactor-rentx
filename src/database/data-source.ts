import { DataSource } from "typeorm";
import { Category } from "../modules/entities/Category"
import { CreateCategories1654826967781 } from "./migrations/1656986536350-migrations"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [Category],
    subscribers: [],
    migrations: [CreateCategories1654826967781],
})
export async function createConnection(): Promise<void> {
    try {
        await AppDataSource.initialize()
        console.log("DB connected!");
    } catch (error) {
        console.log(`Fail to connect DB - Error: ${error}`);
    }
}
