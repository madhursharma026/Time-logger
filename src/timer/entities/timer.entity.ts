import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Timer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    todayTotalTime: String;

    @Column({ nullable: false })
    timerStartAt: String;

    @Column({ nullable: false })
    timerStopAt: String;

    @Column({ nullable: false })
    oldTime: String;

    @Column({ nullable: false })
    userId: String;

    @Column({ nullable: false })
    timerStatus: Boolean;

    @ManyToOne(() => User, user => user.timerDetails, { nullable: false })
    user: User;
}

