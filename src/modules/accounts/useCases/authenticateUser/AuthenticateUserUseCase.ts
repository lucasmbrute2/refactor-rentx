import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcrypt"
import { JwtPayload, sign } from "jsonwebtoken"
import dotenv from "@configs/dotenvEntries"
import { AppError } from "@shared/errors/AppError";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
    refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DayJsDateProvider")
        private dayJsDateProvider: IDateProvider
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const DAYS_TO_EXPIRE_REFRESH_TOKEN = 30;
        const user = await this.usersRepository.findByEmail(email);
        if (!user) throw new AppError("Email or password incorrect");

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) throw new AppError("Email or password incorrect");


        const token = sign({}, dotenv.token.md5Hash, {
            expiresIn: dotenv.token.expires_in_token,
            subject: JSON.stringify(user.id)
        });

        const refresh_token = sign({ email }, dotenv.token.refresh_token_key, {
            subject: user.id?.toString() as string,
            expiresIn: dotenv.token.expires_in_refresh_token
        })

        const refresh_token_expires_date = this.dayJsDateProvider.addDays(DAYS_TO_EXPIRE_REFRESH_TOKEN)

        await this.userTokensRepository.create({
            user_id: user.id as number,
            expires_date: refresh_token_expires_date,
            refresh_token
        })

        const tokenReturn: IResponse = {
            user: {
                email: user.email,
                name: user.name
            },
            token,
            refresh_token
        }

        return tokenReturn;
    }
}