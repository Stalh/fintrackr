import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user';
import { UserEntity } from './entities/user.entity';
import { Observable } from 'rxjs';
import { CreateExpenseDto } from './dto/create-expense';
import { UpdateUserDto } from './dto/update-user';
import { UpdateExpenseDto } from './dto/update-depense';
import { Public, IS_PUBLIC_KEY } from 'src/auth/decorator/public.decorator';
import { Expense } from './schemas/expense';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<UserEntity> {
    return this.userService.findByUsername(username);
  }
  @Get()
  findAll(): Observable<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<UserEntity> {
    return this.userService.findOne(id);
  }

  @Public()
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

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() udatedUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(userId, udatedUserDto);
  }


  @Put(':idUser/update_expense/:idExpense')
  async updateUserExpense(
    @Param('idUser') userId: string,
    @Param('idExpense') expenseId: string,
    @Body() updatedExpenseDto: UpdateExpenseDto,
  ): Promise<void> {
    return this.userService.updateUserExpense(userId, expenseId, updatedExpenseDto);
  }


  @Delete(':idUser/update_expense/:idExpense')
  async deleteUserExpense(@Param('idUser') userId: string, @Param('idExpense') expenseId: string) {
    console.log(`Received delete request for userId: ${userId} and expenseId: ${expenseId}`);
    return this.userService.deleteUserExpense(userId, expenseId);
  }


  @Get(':userId/expenses/:year/:month')
  async getUserExpensesByMonth(
    @Param('userId') userId: string,
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<Expense[]> {
    return this.userService.getUserExpensesByMonth(userId, month, year);
  }

  @Put(':id/add_balance')
  async addBalance(
    @Param('id') userId: string,
    @Body('amount') amount: number,
  ): Promise<UserEntity> {
    return this.userService.addBalance(userId, amount);
  }


}
