import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserToken1661976692470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_tokens",
                columns: [
                    {
                        name: "id",
                        type: "integer",

                    },
                    {
                        name: "refresh_token",
                        type: "varchar"
                    },
                    {
                        name: "user_id",
                        type: "integer"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "expires_date",
                        type: "timestamp"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserToken",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_tokens")
    }

}
