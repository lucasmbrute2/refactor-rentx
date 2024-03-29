import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rental {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car!: Car

    @Column()
    car_id!: number;

    @Column()
    user_id!: number;

    @Column()
    start_date!: Date;

    @Column({
        nullable: true
    })
    end_date!: Date;

    @Column()
    expected_return_data!: Date;

    @Column({
        nullable: true
    })
    total!: number;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    constructor() {
        if (!this.id) this.id = Math.floor(Math.random() * 5000)
    }
}