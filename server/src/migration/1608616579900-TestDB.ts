import { MigrationInterface, QueryRunner } from 'typeorm'

export class TestDB1608616579900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DELETE FROM weather; DELETE FROM query_record; DELETE FROM city;',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DELETE FROM weather; DELETE FROM query_record; DELETE FROM city;',
    )
  }
}
