import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { CreateUserDto } from '../dto/create-user';
import { User } from '../schemas/user';
import { CreateExpenseDto } from '../dto/create-expense';
import { UpdateUserDto } from '../dto/update-user';

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
}
