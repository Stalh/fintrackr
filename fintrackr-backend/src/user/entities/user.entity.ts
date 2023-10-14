import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schemas/user';
import { ExpenseEntity } from './expense.entity';

@Exclude()
export class UserEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'username',
    description: 'Username',
    example: 'john_doe',
  })
  @Expose()
  @Type(() => String)
  username: string;

  @ApiProperty({
    name: 'balance',
    description: 'User balance',
    example: 100.5,
  })
  @Expose()
  @Type(() => Number)
  balance: number;

  @ApiProperty({
    name: 'expenses',
    description: 'List of user expenses',
    type: ExpenseEntity,
    isArray: true,
  })
  @Expose()
  @Type(() => ExpenseEntity)
  expenses: ExpenseEntity[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.expenses = partial.expenses?.map((exp) => new ExpenseEntity(exp));
  }
}
