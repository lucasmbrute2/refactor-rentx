import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Category {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: string;

}