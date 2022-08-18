import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateSpecificationCars1659206068902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "specifications_cars",
            columns: [
                {
                    name: "car_id",
                    type: "integer"
                },
                {
                    name: "specification_id",
                    type: "integer"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }))

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "FKSpecificationCar",
                referencedTableName: "specifications",
                referencedColumnNames: ["id"],
                columnNames: ["specification_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        )

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "FKCarsSpecification",
                columnNames: ["car_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "cars",
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("specifications_cars")
        const foreignKeys = table?.foreignKeys.filter(fk => fk.columnNames.indexOf("car_id") !== -1 || fk.columnNames.indexOf("specification_id") !== -1)

        if (foreignKeys) await queryRunner.dropForeignKeys("specifications_cars", foreignKeys)

        await queryRunner.dropTable("specifications_cars")
    }

}
