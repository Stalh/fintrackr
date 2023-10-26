import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user';
import { UserDao } from './dao/user.dao';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ExpenseModule } from './expense.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ExpenseModule,
  ],
  providers: [UserService, UserDao],
  controllers: [UserController],
  exports: [UserService, UserDao],
})
export class UserModule { }
