import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity()
export class CarImage {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    car_id!: string;

    @Column()
    image_name!: string;

    @Column()
    created_at!: Date;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}