import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timer } from './entities/timer.entity';
import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';
import { User } from 'src/user/entities/user.entity';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Timer, User])],
  controllers: [TimerController, UserController],
  providers: [TimerService, UserService]
})
export class TimerModule {}

