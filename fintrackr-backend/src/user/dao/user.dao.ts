import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, mergeMap, Observable } from 'rxjs';
import { CreateUserDto } from '../dto/create-user';
import { User } from '../schemas/user';
import { CreateExpenseDto } from '../dto/create-expense';
import { UpdateUserDto } from '../dto/update-user';
import { UpdateExpenseDto } from '../dto/update-depense';
import { UserEntity } from '../entities/user.entity';
import { ExpenseEntity } from '../entities/expense.entity';
import { Expense } from '../schemas/expense';

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

        const newBalance = user.balance - expense.amount;
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
  async getUserExpensesByMonth(userId: string, month: number, year: number): Promise<Expense[]> {
    const user = await this._userModel
      .findById(userId)
      .populate('expenses');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const filteredExpenses = user.expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year;
    });

    return filteredExpenses;
  }

  async addBalance(userId: string, amount: number): Promise<UserEntity> {
    const user = await this._userModel.findById(userId).lean();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (amount <= 0) {
      throw new BadRequestException('Invalid amount');
    }
    user.balance += amount;

    // Lean c'est un convertisseur de mongoose qui permet de convertir un objet mongoose en objet javascript (de ce que j'ai compris)
    const updatedUser = await this._userModel.findByIdAndUpdate(userId, { balance: user.balance }, { new: true }).lean();

    return new UserEntity(updatedUser);
  }



}
