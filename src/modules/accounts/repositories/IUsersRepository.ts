import { ICreateUsersDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
    create(data: ICreateUsersDTO): Promise<void>;
    list(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findByID(userID: number): Promise<User | null>
}