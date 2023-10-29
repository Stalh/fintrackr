import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, mergeMap, Observable } from 'rxjs';
import { CreateUserDto } from '../dto/create-user';
import { User } from '../schemas/user';
import { CreateExpenseDto } from '../dto/create-expense';
import { UpdateUserDto } from '../dto/update-user';
import { UpdateExpenseDto } from '../dto/update-depense';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<User>,
  ) { }

  findAll(): Observable<User[]> {
    return from(this._userModel.find().lean().exec());
  }

  findById = (id: string): Observable<User> =>
    from(this._userModel.findById(id)).pipe(
      map((user) => (user ? user.toObject() : null)),
    );

  save = (user: CreateUserDto): Observable<User> =>
    from(new this._userModel(user).save());

  createUserWithExpenses(userDto: CreateUserDto): Observable<User> {
    const user = new this._userModel({
      username: userDto.username,
      password: userDto.password,
      balance: userDto.balance,
      expenses: userDto.expenses || [],
    });

    return from(user.save());
  }

  addExpenseToUser(userId: string, expense: CreateExpenseDto): Observable<User> {
    return from(
      this._userModel.findById(userId)
    ).pipe(
      mergeMap(user => {
        if (!user) throw new NotFoundException(`User with id '${userId}' not found`);

        // Deduct the amount from the user's balance
        const newBalance = user.balance - expense.amount;

        // Check if the new balance is below 0
        if (newBalance < 0) throw new UnprocessableEntityException("Insufficient balance to make this expense.");

        user.balance = newBalance;

        user.expenses.push(expense as any);

        return from(user.save());
      }),
      map(savedUser => (savedUser ? savedUser.toObject() : null))
    );
  }


  async updateUser(userId: string, userUpdated: UpdateUserDto): Promise<User> {
    const user = await this._userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this._userModel.findByIdAndUpdate(userId, userUpdated, { new: true }).exec();
  }

  async updateUserExpense(
    userId: string,
    expenseId: string,
    updatedExpense: UpdateExpenseDto,
  ) {
    const user = await this._userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const expensesArray: any = user.expenses;
    const expense = expensesArray.id(expenseId);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    const amountDifference = updatedExpense.amount - expense.amount;

    user.balance -= amountDifference;

    if (updatedExpense.amount) expense.amount = updatedExpense.amount;
    if (updatedExpense.date) expense.date = updatedExpense.date;
    if (updatedExpense.description) expense.description = updatedExpense.description;

    await user.save();
  }


  async deleteUserExpense(userId: string, expenseId: string) {
    const user = await this._userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const expenseToDelete = user.expenses.find(expense => expense._id.toString() === expenseId);
    if (!expenseToDelete) {
      throw new NotFoundException('Expense not found');
    }

    user.balance += expenseToDelete.amount;
    user.expenses = user.expenses.filter(expense => expense._id.toString() !== expenseId);

    await user.save();
  }

  findByUsername(username: string): Observable<User> {
    return from(this._userModel.findOne({ username: username })).pipe(
      map((user) => (user ? user.toObject() : null))
    );
  }




}
