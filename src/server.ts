import "reflect-metadata"
import express from "express";
import { AppDataSourceUseCases } from "./database/data-source";
const app = express();
app.use(express.json());


AppDataSourceUseCases.createConnection();
const PORT = 3333


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})