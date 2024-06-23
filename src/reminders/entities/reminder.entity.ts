import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reminders' })
export class Reminder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  name: string;

  @Column({ type: 'int', nullable: false, unique: true })
  time: number;
}
