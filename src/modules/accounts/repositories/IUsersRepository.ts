import { ICreateUsersDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
    create(data: ICreateUsersDTO): Promise<void>;
    list(): Promise<User[]>;
    findByName(email: string): Promise<User>;
}