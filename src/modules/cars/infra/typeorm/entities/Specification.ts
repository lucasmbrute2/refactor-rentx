import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("Specification")
export class Specification {

    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @CreateDateColumn()
    created_at!: string;
}