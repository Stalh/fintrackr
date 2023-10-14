import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { CreateUserDto } from '../dto/create-user';
import { User } from '../schemas/user';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<User>,
  ) {}

  findById = (id: string): Observable<User> =>
    from(this._userModel.findById(id)).pipe(
      map((user) => (user ? user.toObject() : null)),
    );

  save = (user: CreateUserDto): Observable<User> =>
    from(new this._userModel(user).save());
}
