import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { Users } from "../infra/typeorm/entities/User";
import { instanceToInstance } from "class-transformer"

export class UserMap {
    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
        avatar_url
    }: Users): IUserResponseDTO {
        const user = instanceToInstance({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url
        })
        return {
            email,
            name,
            id: id as number,
            avatar: avatar as string,
            driver_license,
            avatar_url: user.avatar_url ?? null
        }
    }
}