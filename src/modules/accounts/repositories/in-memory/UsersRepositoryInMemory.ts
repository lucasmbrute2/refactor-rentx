import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create(data: User): Promise<void> {
        if (!data) throw new Error("Method not implemented.");
        await this.users.push(data);
    }


    async list(): Promise<User[]> {
        return await this.users;
    }

    async findByEmail(email: string): Promise<User | void> {

        return await this.users.find(user => user.email === email);

    }

    async findByID(userID: number): Promise<User | void> {
        return await this.users.find(user => user.id === userID);
    }

}