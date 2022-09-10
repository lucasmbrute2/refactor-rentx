import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUserTokensRepository } from "../IUserTokensRepository";

export class UsersTokensRepositoryInMemory implements IUserTokensRepository {
    userTokens: UserTokens[] = [];

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = await Object.assign(new UserTokens(),
            expires_date,
            refresh_token,
            user_id
        )

        await this.userTokens.push(userToken)
        return userToken;

    }
    async findByUserIDAndRefreshToken(user_id: number, refresh_token: string): Promise<UserTokens | Falsy> {
        return await this.userTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refresh_token)
    }

    async deleteByID(id: number): Promise<void> {
        await this.userTokens.splice(this.userTokens.findIndex(userToken => userToken.id === id), 1);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens | Falsy> {
        return await this.userTokens.find(ut => ut.refresh_token === refresh_token)
    }

}