export interface IUserResponseDTO {
    email: string;
    name: string;
    id: number;
    avatar: string;
    driver_license: string;
    avatar_url(): string | null;
}