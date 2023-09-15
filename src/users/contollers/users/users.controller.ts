import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { ValidatePipePipe } from 'src/users/pipes/validate-pipe/validate-pipe.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidatePipePipe) userData: CreateUserDto) {
    return { email: userData.email };
  }
  @Get(':id')
  getUserParams(@Param('id', ParseIntPipe) id: number) {
    return { id, user: this.userService.fetchUsers() };
  }
  @Get()
  getQueryParams(@Query('userId') userId: string) {
    console.log(userId);
    return userId;
  }
}
