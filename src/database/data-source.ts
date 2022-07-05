import { DataSource } from "typeorm";
import { Category } from "../modules/entities/Category"

export const AppDataSourceUseCases = {
    AppDataSource: new DataSource({
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
        migrations: [],
    }),
    createConnection: async function (): Promise<void> {
        try {
            await this.AppDataSource.initialize()
            console.log("DB connected!");
        } catch (error) {
            console.log(`Fail to connect DB - Error: ${error}`);
        }
    }
}