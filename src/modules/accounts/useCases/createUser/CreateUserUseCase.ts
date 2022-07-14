import { inject, injectable } from "tsyringe";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt"

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(data: ICreateUsersDTO): Promise<void> {
        const user = await this.usersRepository.findByName(data.email)

        if (user) throw ("User already exists.");

        const { password } = data;
        const hashPassword = await hash(password, 8);
        data.password = hashPassword

        await this.usersRepository.create(data)
    }
}