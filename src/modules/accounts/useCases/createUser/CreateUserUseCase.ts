import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt"
import { AppError } from "@shared/errors/AppError";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

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