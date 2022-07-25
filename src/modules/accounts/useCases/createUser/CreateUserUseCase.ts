import { inject, injectable } from "tsyringe";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt"
import { AppError } from "../../../../errors/AppError";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(data: ICreateUsersDTO): Promise<void> {
        const user = await this.usersRepository.findByEmail(data.email)

        if (user) throw new AppError("User already exists.");

        const cloneData = { ...data }
        const { password } = cloneData;
        const hashPassword = await hash(password, 8);
        cloneData.password = hashPassword

        await this.usersRepository.create(cloneData)
    }
}