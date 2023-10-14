import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schemas/user';

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

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
