import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/DayJsDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid"

@injectable()
export class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserTokensRepository")
        private usersTokensRepository: IUserTokensRepository,
        @inject("DayJsDateProvider")
        private dayJsDateProvider: DayJsDateProvider,
        @inject("MailProvider")
        private mailProvider: IMailProvider
    ) { }

    async execute(email: string) {
        const HOURS_TO_EXPIRE_TOKEN = 3;
        const user = await this.usersRepository.findByEmail(email)
        if (!user) throw new AppError("User does not exists.");

        const token = uuid();

        const expires_date = this.dayJsDateProvider.addHours(HOURS_TO_EXPIRE_TOKEN)

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user?.id ?? 0,
            expires_date
        })

        await this.mailProvider.sendMail(email, "Recuperação de senha", `O link para o reset é ${token}`)
    }
}