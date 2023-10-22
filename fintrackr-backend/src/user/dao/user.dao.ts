import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { CreateUserDto } from '../dto/create-user';
import { User } from '../schemas/user';
import { CreateExpenseDto } from '../dto/create-expense';
import { UpdateUserDto } from '../dto/update-user';
import { UpdateExpenseDto } from '../dto/update-depense';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<User>,
  ) {}

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

  addExpenseToUser(
    userId: string,
    expense: CreateExpenseDto,
  ): Observable<User> {
    return from(
      this._userModel.findByIdAndUpdate(
        userId,
        {
          $push: { expenses: expense },
        },
        { new: true },
      ),
    ).pipe(map((user) => (user ? user.toObject() : null)));
  }

  updateUser(
      userId : string,
      userUpdated : UpdateUserDto
    ){
      const user = this._userModel.findById(userId);
      if(!user){
        throw new NotFoundException('User not found');
      }
      else{
        this._userModel.findByIdAndUpdate(
          userId,
          userUpdated
        );
      }
  }
  async updateUserExpense(
    userId : string,
    expenseId : string,
    updatedExpense : UpdateExpenseDto
  ){
    const user =  this._userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const expensePos = (await user).expenses.findIndex(expense => expense._id === expenseId);
    if (expensePos === -1) {
      throw new NotFoundException('Expense not found');
    }
    (await user).expenses[expensePos] = { ...(await user).expenses[expensePos], ...updatedExpense };
     (await user).save();
  }
  
  async deleteUserExpense(
    userId : string,
    expenseId : string
  ){
    const user =  this._userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    (await user).expenses = (await user).expenses.filter(expense => expense._id !== expenseId);

     (await user).save();
  }
}

