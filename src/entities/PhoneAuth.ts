import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

/**
 * primaryKey
 * userPhoneNum
 * phoneAuthNum
 * phoneAuthNumExpiredAt
 * phoneAuthNumCreatedAt
 * phoneAuthNumUpdatedAt
 * phoneAuthStatus
 */
@Entity()
export class PhoneAuth extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: Number;

  @Column()
  phoneAuthNum: number;

  @Column()
  phoneNum: Number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  expiredAt: Date;
}
