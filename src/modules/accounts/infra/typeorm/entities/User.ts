import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity("User")
export class User {
    @PrimaryGeneratedColumn()
    id?: string;

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

    @Column({
        type: "varchar",
        nullable: true
    })
    avatar!: string | null;

}