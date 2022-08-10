import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity()
export class Rental {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    car_id!: string;

    @Column()
    user_id!: string;

    @Column()
    start_date!: Date;

    @Column()
    end_date!: Date;

    @Column()
    expected_return_data!: Date;

    @Column()
    total!: number;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    constructor() {
        if (!this.id) this.id = uuid()
    }
}