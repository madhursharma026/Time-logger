import { TimerService } from './timer.service';
import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('timer')
export class TimerController {
  constructor(private readonly timerService: TimerService,
    private readonly userService: UserService) {}

  @Post('/updateTimer/:userId')
  updateTimer(@Param('userId') userId: string) {
    return this.timerService.updateTimer(userId);
  }

  @Get(':userId')
  userFindOne(@Param('userId') userId: string) {
    return this.timerService.userFindOne(userId);
  }
}

