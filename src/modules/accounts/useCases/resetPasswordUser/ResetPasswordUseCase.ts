import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt"

@injectable()
export class ResetPasswordUseCase {
    constructor(
        @inject("UserTokensRepository")
        private usersTokensRepository: IUserTokensRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }


    async execute(token: string, password: string): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(token)

        if (!userToken) throw new AppError("Token invalid.");

        if (this.dateProvider.compareIfIsBefore(userToken.expires_date, this.dateProvider.dateNow())) {
            throw new AppError("Token expired.");
        }

        const user = await this.usersRepository.findByID(Number(userToken.user_id))
        if (!user) throw new AppError("User not found.");

        user.password = await hash(password, 8)
        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteByID(Number(userToken.id))
    }
}