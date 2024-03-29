import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CarImages1659402018995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "cars_image",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true
                },
                {
                    name: "car_id",
                    type: "integer",

                },
                {
                    name: "image_name",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FKCarImage",
                    columnNames: ["car_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "cars",
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars_image", true, true)
    }

}
