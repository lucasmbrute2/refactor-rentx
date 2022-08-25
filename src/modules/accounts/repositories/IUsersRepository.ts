import { ICreateUsersDTO } from "../dtos/ICreateUserDTO";
import { Users } from "../infra/typeorm/entities/User";

export interface IUsersRepository {
    create(data: ICreateUsersDTO): Promise<void>;
    list(): Promise<Users[]>;
    findByEmail(email: string): Promise<Users | null>;
    findByID(userID: number): Promise<Users | null>
}