export interface ICreateUserTokenDTO {
    user_id: number;
    expires_date: Date;
    refresh_token: string;
}