import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { Users } from "../infra/typeorm/entities/User";

export class UserMap {
    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license
    }: Users): IUserResponseDTO {
        return {
            email,
            name,
            id: id as number,
            avatar: avatar as string,
            driver_license
        }
    }
}