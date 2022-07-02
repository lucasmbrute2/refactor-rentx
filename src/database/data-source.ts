import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
})


export function createConnection(): void {
    AppDataSource.initialize().then(() => {
        console.log("DB connected!");
    }).catch(err => console.log(err))
}