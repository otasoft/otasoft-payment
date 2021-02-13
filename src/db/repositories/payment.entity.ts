import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  booking_id: number;

  @Column()
  created_at: Date;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  stripe_id: string;

  @Column()
  stripe_status: string;
}
