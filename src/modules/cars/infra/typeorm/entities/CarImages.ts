import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { Car } from "./Car";

@Entity()
export class CarImage {
    @PrimaryGeneratedColumn()
    id!: string;

    @ManyToOne(() => Car, (car) => car.id)
    car_id!: string;

    @Column()
    image_name!: string;

    @Column()
    created_at!: Date;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}