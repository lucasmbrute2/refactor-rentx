import dotenvEntries from "@configs/dotenvEntries";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { verify, sign } from "jsonwebtoken"
import { inject } from "tsyringe";

interface IPayload {
    subject: string,
    email: string
}

export class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUserTokensRepository,
        @inject("DayJsDateProvider")
        private dayJsDateProvider: IDateProvider
    ) { }

    async execute(refresh_token: string): Promise<string> {
        const DAYS_TO_EXPIRE_REFRESH_TOKEN = 30;
        const { subject: user_id, email } = verify(refresh_token, dotenvEntries.token.refresh_token_key) as IPayload;

        const userToken = await this.usersTokensRepository.findByUserIDAndRefreshToken(Number(user_id), refresh_token)

        if (!userToken) throw new Error("Refresh token don't exists!");

        await this.usersTokensRepository.deleteByID(Number(userToken.id))

        const createdRefreshToken = sign({ email }, dotenvEntries.token.refresh_token_key, {
            subject: user_id.toString() as string,
            expiresIn: dotenvEntries.token.expires_in_refresh_token
        })

        const expires_date = this.dayJsDateProvider.addDays(DAYS_TO_EXPIRE_REFRESH_TOKEN)

        await this.usersTokensRepository.create({
            user_id: Number(user_id),
            expires_date,
            refresh_token
        })

        return createdRefreshToken;
    }
}