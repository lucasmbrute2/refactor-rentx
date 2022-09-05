import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import dotenvEntries from "@configs/dotenvEntries";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const userTokensRepository = new UserTokensRepository()

    if (!authHeader) throw new AppError("Token missing.", 401);

    const [_, token] = authHeader.split(" ");

    try {
        //getting user ID
        const { sub: user_id } = verify(token, dotenvEntries.token.refresh_token_key) as IPayload
        const user = await userTokensRepository.findByUserIDAndRefreshToken(Number(user_id), token)

        if (!user) throw new AppError("User does not authenticated.");

        req.user = {
            id: user_id
        };

        return next();

    } catch (error) {
        throw new AppError("Invalid token", 401);
    }

}