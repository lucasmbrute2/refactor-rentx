import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new Error("Token missing.");

    const [_, token] = authHeader.split(" ");

    try {
        //getting user ID
        const { sub: user_id } = verify(token, process.env.MD5HASH_JSON_TOKEN ?? "sounds") as IPayload
        const usersRepository = new UsersRepository()
        const user = usersRepository.findByID(Number(user_id))

        if (!user) throw new Error("User does not authenticated.");

        return next();

    } catch (error) {
        throw new Error("Invalid token");
    }

}