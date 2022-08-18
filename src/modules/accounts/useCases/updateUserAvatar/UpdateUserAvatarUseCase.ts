import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: number;
    avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) { }

    async execute({ user_id, avatar_file }: IRequest) {
        const user = await this.userRepository.findByID(user_id)

        if (user?.avatar) await deleteFile(`./temp/avatar/${user.avatar}`)

        if (!user) throw new AppError("User not found.");

        user.avatar = avatar_file;

        await this.userRepository.create(user)
    }
}