import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'risk_types' })
export class RiskType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 35, nullable: false })
  name: string;
}
