import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({
    name: 'amount',
    description: 'Expense amount',
    example: 50.25,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    name: 'date',
    description: 'Date of the expense',
    example: '2023-10-14',
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    name: 'description',
    description: 'Description of the expense',
    example: 'Dinner at a restaurant',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
