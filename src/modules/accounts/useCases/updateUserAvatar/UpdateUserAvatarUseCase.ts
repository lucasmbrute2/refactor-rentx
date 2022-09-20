import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
    user_id: number;
    avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) { }

    async execute({ user_id, avatar_file }: IRequest) {
        const user = await this.userRepository.findByID(user_id)

        if (user?.avatar) await this.storageProvider.delete(user.avatar, "avatar");

        await this.storageProvider.save(avatar_file, "avatar")

        if (!user) throw new AppError("User not found.");

        user.avatar = avatar_file;

        await this.userRepository.create(user)
    }
}