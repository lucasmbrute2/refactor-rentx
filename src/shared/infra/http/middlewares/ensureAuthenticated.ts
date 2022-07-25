import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new AppError("Token missing.", 401);

    const [_, token] = authHeader.split(" ");

    try {
        //getting user ID
        const { sub: user_id } = verify(token, process.env.MD5HASH_JSON_TOKEN ?? "sounds") as IPayload
        const usersRepository = new UsersRepository()
        const user = await usersRepository.findByID(Number(user_id))

        if (!user) throw new AppError("User does not authenticated.");

        req.user = {
            id: user_id
        };

        return next();

    } catch (error) {
        throw new AppError("Invalid token", 401);
    }

}