import { inject, injectable } from "tsyringe";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(data: ICreateUsersDTO): Promise<void> {
        const user = await this.usersRepository.findByName(data.username)

        if (user) throw new Error("User already exists.");

        await this.usersRepository.create(data)
    }
}