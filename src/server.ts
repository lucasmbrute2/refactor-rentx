import "reflect-metadata"
import express from "express";
import { AppDataSourceUseCases } from "./database/data-source";
import { router } from "./routes"
const app = express();
app.use(express.json());
app.use(router);

AppDataSourceUseCases.createConnection();
const PORT = 3333


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})