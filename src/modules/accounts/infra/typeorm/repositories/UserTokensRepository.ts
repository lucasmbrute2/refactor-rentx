import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

export class UserTokensRepository implements IUserTokensRepository {
    private repository: Repository<UserTokens>

    constructor() {
        this.repository = AppDataSource.getRepository(UserTokens)
    }
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const payload = {
            expires_date,
            refresh_token,
            user_id
        }

        const userToken: UserTokens = this.repository.create(payload)
        return this.repository.save(userToken)
    }

    async findByUserIDAndRefreshToken(user_id: number, refresh_token: string): Promise<UserTokens | Falsy> {
        const token = await this.repository.findOne({
            where: {
                refresh_token,
                user_id
            }
        })

        if (!token) return null;
        return token;
    }

    async deleteByID(id: number): Promise<void> {
        await this.repository.delete(id);
    }

}