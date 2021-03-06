import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import { createConnection } from "../typeorm/data-source";
import "../../container";
import { router } from "./routes/index"
import { AppError } from "../../errors/AppError";

const app = express();
app.use(express.json());
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
})

createConnection();
const PORT = 3333

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})