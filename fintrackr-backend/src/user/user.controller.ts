import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user';
import { UserEntity } from './entities/user.entity';
import { Observable } from 'rxjs';
import { CreateExpenseDto } from './dto/create-expense';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Observable<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<UserEntity> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Post(':id/add_expense')
  addExpense(
    @Param('id') userId: string,
    @Body() expenseDto: CreateExpenseDto,
  ): Observable<UserEntity> {
    return this.userService.addExpense(userId, expenseDto);
  }
}
