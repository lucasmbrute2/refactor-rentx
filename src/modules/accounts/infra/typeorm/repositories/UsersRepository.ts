import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source"
import { Repository } from "typeorm";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";

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

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOneBy({ email })
        return user;
    }

    async findByID(id: string): Promise<User | null> {
        const user = await this.repository.findOne({
            where: {
                id
            }
        })
        return user
    }

}