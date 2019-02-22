import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 128, nullable: false })
  firstName: string;

  @Column('varchar', { length: 128, nullable: false })
  lastName: string;
}
