import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE_NAME = 'users';

export class CreateUser1550871075151 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '36',
          isPrimary: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'firstName',
          type: 'varchar',
          length: '128',
          isNullable: false,
        },
        {
          name: 'lastName',
          type: 'varchar',
          length: '128',
          isNullable: false,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(TABLE_NAME);
  }

}
