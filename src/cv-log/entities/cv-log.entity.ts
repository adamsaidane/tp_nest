import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum CvOperation {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

@Entity('cv_logs')
export class CvLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: CvOperation })
    operation: CvOperation;

    @Column()
    cvId: number;

    @CreateDateColumn()
    date: Date;

    @ManyToOne(() => User, { eager: true, nullable: true })
    performedBy: User;
}