import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import { createConnection } from "../typeorm/data-source";
import "../../container";
import { router } from "./routes/index"
import { AppError } from "../../errors/AppError";
import upload from "@configs/uploads/upload";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())
app.use(router);
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/avatar", express.static(`${upload.tmpFolder}/cars`));

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
export { app }