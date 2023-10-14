import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateExpenseDto } from './create-expense';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    name: 'username',
    description: 'Username',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    name: 'password',
    description: 'Password',
    example: 'secure_password_123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    name: 'balance',
    description: 'User balance',
    example: 100.5,
  })
  @IsOptional()
  @IsNumber()
  balance?: number;

  @ApiPropertyOptional({
    name: 'expenses',
    description: 'List of user expenses',
    type: CreateExpenseDto,
    isArray: true,
  })
  @IsOptional()
  @Type(() => CreateExpenseDto)
  @ValidateNested({ each: true })
  expenses?: CreateExpenseDto[];
}
