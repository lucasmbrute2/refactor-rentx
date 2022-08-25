import { Users } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
    users: Users[] = [];

    async create(data: Users): Promise<void> {
        if (!data) throw new Error("Method not implemented.");
        await this.users.push(data);
    }


    async list(): Promise<Users[]> {
        return await this.users;
    }

    async findByEmail(email: string): Promise<Users | null> {

        const user = await this.users.find(user => user.email === email);
        if (!user) return null

        return user

    }

    async findByID(userID: number): Promise<Users | null> {
        const user = await this.users.find(user => user.id === userID);
        if (!user) return null

        return user
    }

}