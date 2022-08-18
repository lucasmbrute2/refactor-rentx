import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { Car } from "./Car";

@Entity()
export class CarImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Car, (car) => car.car_image)
    car_id!: number;

    @Column()
    image_name!: string;

    @Column()
    created_at!: Date;

    constructor() {
        if (!this.id) this.id = Math.floor(Math.random() * 5000)
    }
}