const moment = require("moment");
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Timer } from './entities/timer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TimerService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Timer) private timerRepository: Repository<Timer>) { }

    findOne(userId) {
        if (!userId) {
            return null;
        }
        return this.timerRepository.findOne({ where: { userId: userId } });
    }

    async updateTimer(userId: string) {
        const dataExists = await this.findOne(userId);
        if (dataExists) {
            if (dataExists.timerStatus === true) {
                dataExists.timerStatus = false
                dataExists.timerStopAt = moment().format("HH:mm:ss")
                dataExists.oldTime = dataExists.todayTotalTime
                dataExists.todayTotalTime = moment().subtract((dataExists.timerStopAt, dataExists.timerStartAt), 'h').format('HH:mm:ss');
                return this.timerRepository.save(dataExists);
            }
            if (dataExists.timerStatus === false) {
                dataExists.timerStatus = true
                dataExists.timerStartAt = moment().format("HH:mm:ss")
                dataExists.timerStopAt = ""
                return this.timerRepository.save(dataExists);
            }
        }
        var timerStatus = true
        var timerStartAt = moment().format("HH:mm:ss")
        var todayTotalTime = "00:00:00"
        var timerStopAt = "00:00:00"
        var oldTime = "00:00:00"
        const newDetails = this.timerRepository.create({ timerStatus, oldTime, todayTotalTime, timerStartAt, timerStopAt });
        newDetails.userId = userId
        return this.timerRepository.save(newDetails);
    }

    async userFindOne(userId) {
        let user: User = await this.userRepo.findOne({ where: { id: userId } });
        return user
    }
}
