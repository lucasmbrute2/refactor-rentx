import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Specification {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @CreateDateColumn()
    created_at!: string;
}