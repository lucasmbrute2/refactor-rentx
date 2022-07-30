import { User } from "@modules/accounts/infra/typeorm/entities/User";
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

    async findByEmail(email: string): Promise<User | null> {

        const user = await this.users.find(user => user.email === email);
        if (!user) return null

        return user

    }

    async findByID(userID: string): Promise<User | null> {
        const user = await this.users.find(user => user.id === userID);
        if (!user) return null

        return user
    }

}