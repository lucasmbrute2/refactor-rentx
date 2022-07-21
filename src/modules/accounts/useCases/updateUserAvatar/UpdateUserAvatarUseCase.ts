import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) { }

    async execute({ user_id, avatar_file }: IRequest) {
        const user = await this.userRepository.findByID(Number(user_id))

        if (!user) throw new AppError("User not found.");

        user.avatar = avatar_file;

        await this.userRepository.create(user)
    }
}