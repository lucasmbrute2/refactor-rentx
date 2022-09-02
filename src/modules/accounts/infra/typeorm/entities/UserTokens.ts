import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User";

@Entity()
export class UserTokens {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    refresh_token!: string

    @Column()
    expires_date!: Date;

    @CreateDateColumn()
    created_at!: Date

    @Column()
    user_id!: number

    @ManyToOne(() => Users)
    @JoinColumn({ name: "user_id" })
    user!: Users
}