import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import { createConnection } from "../typeorm/data-source";
import "../../container";
import { router } from "./routes/index"
import { AppError } from "../../errors/AppError";
import upload from "@configs/uploads/upload";
import cors from "cors"
import { rateLimiterMiddleware } from "./middlewares/rateLimiter";
import * as Sentry from "@sentry/node"
import * as Tracing from "@sentry/tracing"
import configs from "@configs/dotenvEntries"

const app = express();
app.use(rateLimiterMiddleware);

Sentry.init({
    dsn: configs.sentry.dsn,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


app.use(express.json());
app.use(cors())
app.use(router);
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/avatar", express.static(`${upload.tmpFolder}/cars`));

app.use(Sentry.Handlers.errorHandler());

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