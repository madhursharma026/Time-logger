import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/register')
  async createCategory(@Body() body: CreateUserDto) {
    const newUser = await this.userService.create(body.fullName, body.email, body.password);
    return newUser;
  }

  @Post('/login')
  async login(@Body() body: CreateUserDto) {
    return this.userService.login(body.email, body.password);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }
}

