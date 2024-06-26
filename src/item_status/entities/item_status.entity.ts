import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'item_status' })
export class ItemStatus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 25, nullable: false, unique: true })
  name: string;
}
