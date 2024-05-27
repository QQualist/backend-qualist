import { Checklist } from 'src/checklists/entities/checklist.entity';
import { Priority } from 'src/priorities/entities/priority.entity';
import { RiskType } from 'src/seeders/entities/risk-type.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  risk: string;

  @ManyToOne(() => RiskType, (risk) => risk, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'risk_type_id' })
  risk_type: RiskType;

  @ManyToOne(() => Checklist, (checklist) => checklist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'checklist_uuid' })
  checklist: Checklist;

  @ManyToOne(() => Priority, (priority) => priority, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'priority_uuid' })
  priority: Priority;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
