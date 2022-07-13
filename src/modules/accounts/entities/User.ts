import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity("User")
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    username!: string;

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

}