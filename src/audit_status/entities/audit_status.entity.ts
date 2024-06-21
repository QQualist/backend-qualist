import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'audit_status' })
export class AuditStatus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 15, nullable: false, unique: true })
  name: string;
}
