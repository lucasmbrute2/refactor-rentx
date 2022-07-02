import "reflect-metadata"
import express from "express";
import { createConnection } from "./database/data-source";
const app = express();
app.use(express.json());
createConnection();
const PORT = 3333




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})