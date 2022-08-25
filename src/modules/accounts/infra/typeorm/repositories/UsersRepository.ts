import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source"
import { Repository } from "typeorm";
import { Users } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";

export class UsersRepository implements IUsersRepository {
    private repository: Repository<Users>;

    constructor() {
        this.repository = AppDataSource.getRepository(Users)
    }

    async create(data: ICreateUsersDTO): Promise<void> {
        const user = this.repository.create(data);
        await this.repository.save(user);
    }

    async list(): Promise<Users[]> {
        const users = await this.repository.find();
        return users
    }

    async findByEmail(email: string): Promise<Users | null> {
        const user = await this.repository.findOneBy({ email })
        return user;
    }

    async findByID(id: number): Promise<Users | null> {
        const user = await this.repository.findOne({
            where: {
                id
            }
        })
        return user
    }
}