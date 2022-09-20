import { Users } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(id: number): Promise<Users> {
        const user = await this.usersRepository.findByID(id)
        if (!user) throw new Error("User not found!");

        return user;
    }
}