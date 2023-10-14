import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class ExpenseEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier of the expense',
    example: '5763cd4dc378a38ecd387738',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'amount',
    description: 'Expense amount',
    example: 50.25,
  })
  @Expose()
  @Type(() => Number)
  amount: number;

  @ApiProperty({
    name: 'date',
    description: 'Date of the expense',
    example: '2023-10-14',
  })
  @Expose()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    name: 'description',
    description: 'Description of the expense',
    example: 'Dinner at a restaurant',
  })
  @Expose()
  @Type(() => String)
  description: string;

  constructor(partial: Partial<ExpenseEntity>) {
    Object.assign(this, partial);
  }
}
