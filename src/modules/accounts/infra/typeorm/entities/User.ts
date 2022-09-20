import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    driver_license!: string;

    @Column('boolean', { default: false })
    isAdmin?: boolean = false;

    @CreateDateColumn()
    created_at?: string;

    @Expose({ name: "avatar_url" })
    avatar_url(): string | null {
        switch (process.env.DISK) {
            case "local":
                return `${process.env.APP_API_URL}/avatar/${this.avatar}`

            case "s3":
                return `${process.env.AWS_BUKECT_URL}/avatar/${this.avatar}`

            default:
                return null
        }
    }

    @Column({
        type: "varchar",
        nullable: true
    })
    avatar!: string | null;

}