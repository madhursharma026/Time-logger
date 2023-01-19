const moment = require("moment");
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>,) { }

    async create(fullName: string, email: string, password: string) {
        let joinedDate = moment().format("YYYY-MM-DD")
        const user = await this.findOne(email)
        if (user) {
            throw new BadRequestException("User already exists!");
        }
        const HabitDetails = this.userRepo.create({ email, fullName, joinedDate });
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        HabitDetails.password = hash;
        return this.userRepo.save(HabitDetails);
    }

    async login(email, password) {
        const user = await this.userRepo.findOne({ where: { email: email } })
        if (!user) {
            throw new BadRequestException(`User not exists with ${email}`);
        }
        const valid = await bcrypt.compare(password, user.password)
        if (user && valid) {
            const { password, ...result } = user
            return result
        }
        throw new BadRequestException(`Bad Password`);
    }

    async findOne(email) {
        let user: User = await this.userRepo.findOne({ where: { email: email } });
        return user
    }
}

