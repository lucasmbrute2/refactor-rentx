import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { AppDataSource } from "../../../../database/data-source"
import { Repository } from "typeorm";

export class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }

    async create(data: ICreateUsersDTO): Promise<void> {
        const user = this.repository.create(data);

        await this.repository.save(user);

    }

    async list(): Promise<User[]> {
        const users = await this.repository.find();
        return users
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({ email })
        return user;
    }

}