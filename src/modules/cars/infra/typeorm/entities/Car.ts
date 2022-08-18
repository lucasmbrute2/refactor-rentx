import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { CarImage } from "./CarImages";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity()
export class Car {
    @PrimaryColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    daily_rate!: number;

    @Column()
    license_plate!: string;

    @Column()
    fine_amount!: number;

    @Column()
    brand!: string;

    @Column()
    category_id!: number;

    @Column()
    available?: boolean = true

    @CreateDateColumn()
    created_at?: Date;

    @OneToMany(() => CarImage, ((carImage) => carImage.car_id))
    car_image!: CarImage[];

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [
            {
                name: "car_id"
            }
        ],
        inverseJoinColumns: [
            {
                name: "specification_id"
            }
        ]

    })
    specifications!: Specification[];

    constructor() {
        if (!this.id) {
            this.id = Math.floor(Math.random() * 5000)
        }
    }
}