import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUserTokensRepository {
    create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens>
    findByUserIDAndRefreshToken(user_id: number, refresh_token: string): Promise<UserTokens | Falsy>
    deleteByID(id: number): Promise<void>
    findByRefreshToken(refresh_token: string): Promise<UserTokens | Falsy>
}