import * as redis from "redis"
import { RateLimiterRedis } from "rate-limiter-flexible"
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";
import configEnv from "@configs/dotenvEntries"

const redisClient = redis.createClient({
    //@ts-ignore
    database: configEnv.redis.host,
    port: Number(configEnv.redis.port),
});

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiterMiddleware',
    points: 5,
    duration: 5,
});

export const rateLimiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await rateLimiter.consume(req.ip)
        return next();
    } catch (error) {
        throw new AppError("Too many requests.", 429);
    }
}