import "reflect-metadata";
import express from "express";
import { createConnection } from "./database/data-source";
import { router } from "./routes/index"
const app = express();
app.use(express.json());
app.use(router);

createConnection();
const PORT = 3333

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})