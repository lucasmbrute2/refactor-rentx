import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCars1658791215491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "cars",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "daily_rate",
                    type: "numeric"
                },
                {
                    name: "available",
                    type: "boolean",
                    default: true
                },
                {
                    name: "license_plate",
                    type: "varchar"
                },
                {
                    name: "fine_amount",
                    type: "numeric"
                },
                {
                    name: "brand",
                    type: "varchar"
                },
                {
                    name: "category_id",
                    type: "integer",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },

            ],
            foreignKeys: [
                {
                    name: "FKCategoryCars",
                    referencedTableName: "categories", // tabela de origem
                    referencedColumnNames: ["id"], // referencia do campo na tabela de origem
                    columnNames: ["category_id"], // referencia do campo na tabela de destino
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars")
    }

}
