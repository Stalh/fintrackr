import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user';
import { UserEntity } from './entities/user.entity';
import { UserDao } from './dao/user.dao';
import { CreateExpenseDto } from './dto/create-expense';
import { UpdateExpenseDto } from './dto/update-depense';
import { UpdateUserDto } from './dto/update-user';

@Injectable()
export class UserService {
  /**
   * Class constructor
   *
   * @param {UserDao} _userDao instance of the DAO
   */
  constructor(private readonly _userDao: UserDao) { }

  findOne(id: string): Observable<UserEntity> {
    return this._userDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((user) =>
        !!user
          ? of(new UserEntity(user))
          : throwError(
            () => new NotFoundException(`User with id '${id}' not found`),
          ),
      ),
    );
  }

  create(userDto: CreateUserDto): Observable<UserEntity> {
    return this._userDao.createUserWithExpenses(userDto).pipe(
      catchError((e) =>
        e.code === 11000
          ? throwError(
            () =>
              new ConflictException(
                `User with username '${userDto.username}' already exists`,
              ),
          )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((userCreated) => new UserEntity(userCreated)),
    );
  }

  findAll(): Observable<UserEntity[]> {
    return this._userDao
      .findAll()
      .pipe(map((users) => users.map((user) => new UserEntity(user))));
  }

  addExpense(
    userId: string,
    expenseDto: CreateExpenseDto,
  ): Observable<UserEntity> {
    return this._userDao.addExpenseToUser(userId, expenseDto).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((user) =>
        !!user
          ? of(new UserEntity(user))
          : throwError(
            () => new NotFoundException(`User with id '${userId}' not found`),
          ),
      ),
    );
  }

  async updateUserExpense(
    userId: string,
    expenseId: string,
    updatedExpenseDto: UpdateExpenseDto,
  ): Promise<void> {
    await this._userDao.updateUserExpense(userId, expenseId, updatedExpenseDto);
  }


  async updateUser(userId: string, updatedUserDto: UpdateUserDto): Promise<UserEntity> {
    const updatedUser = await this._userDao.updateUser(userId, updatedUserDto);
    return new UserEntity(updatedUser);
  }


  async deleteUserExpense(userId: string, expenseId: string) {
    return this._userDao.deleteUserExpense(userId, expenseId);
  }

}
