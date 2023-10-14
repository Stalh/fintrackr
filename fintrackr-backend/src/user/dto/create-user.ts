/* eslint-disable prettier/prettier */
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
  } from 'class-validator';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
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
      example: 100.50,
    })
    @IsOptional()
    @IsNumber()
    balance?: number;
  }
  