import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user';
import { UserDao } from './dao/user.dao';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserDao],
  controllers: [UserController],
  exports: [UserService, UserDao], // si vous prévoyez de les utiliser en dehors de ce module
})
export class UserModule {}
