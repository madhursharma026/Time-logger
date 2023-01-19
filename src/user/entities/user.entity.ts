import { Timer } from 'src/timer/entities/timer.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    fullName: String;

    @Column({ nullable: false })
    email: String;

    @Column({ nullable: false })
    password: String;

    @OneToMany(() => Timer, timer => timer.user, { nullable: false })
    timerDetails: Timer[];

    @Column({ type: 'date', nullable: false })
    joinedDate: Date;
}

