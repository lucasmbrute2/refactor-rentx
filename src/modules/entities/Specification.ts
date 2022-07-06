import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("Specification")
export class Specification {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    created_at!: Date;
}