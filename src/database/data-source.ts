import { DataSource } from "typeorm";

export const AppDataSourceUseCases = {
    AppDataSource: new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "test",
        password: "test",
        database: "test",
        synchronize: true,
        logging: true,
        entities: ['Category'],
        subscribers: [],
        migrations: [],
    }),
    createConnection(): void {
        this.AppDataSource.initialize().then(() => {
            console.log("DB connected!");
        }).catch(err => console.log(err))

    }
}