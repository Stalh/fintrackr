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

@Injectable()
export class UserService {
  /**
   * Class constructor
   *
   * @param {UserDao} _userDao instance of the DAO
   */
  constructor(private readonly _userDao: UserDao) {}

  findOne = (id: string): Observable<UserEntity> =>
    this._userDao.findById(id).pipe(
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

  create = (user: CreateUserDto): Observable<UserEntity> =>
    this._userDao.save(user).pipe(
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `User with username '${user.username}' already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((userCreated) => new UserEntity(userCreated)),
    );

  // ... other CRUD operations can be added similarly
}
