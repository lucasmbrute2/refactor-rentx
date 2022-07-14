import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import dotenv from "../../../../configs/dotenvEntries"

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
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) throw "Email or password incorrect";

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) throw "Email or password incorrect"


        const token = sign({}, dotenv.token.md5Hash, {
            expiresIn: "1day",
            subject: JSON.stringify(user.id)
        });

        const tokenReturn: IResponse = {
            user: {
                email: user.email,
                name: user.name
            },
            token
        }

        return tokenReturn;
    }
}