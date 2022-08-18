import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateRentals1659488853705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "rentals",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true
                    },
                    {
                        name: "car_id",
                        type: "integer"
                    },
                    {
                        name: "user_id",
                        type: "integer"
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "expected_return_date",
                        type: "timestamp",
                    },
                    {
                        name: "total",
                        type: "numeric",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKCarID",
                        columnNames: ["car_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "cars",
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKUserID",
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rentals", true, true)
    }

}
