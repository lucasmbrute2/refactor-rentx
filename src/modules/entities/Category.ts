import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity("Category")
export class Category {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: string;

}