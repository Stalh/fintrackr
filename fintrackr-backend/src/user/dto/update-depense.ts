import {
    IsString,
    IsOptional,
    IsNumber,
    IsDate,
  } from 'class-validator';
export class UpdateExpenseDto {
 
  @IsNumber()
  @IsOptional()
  amount?: number;

  
  @IsDate()
  @IsOptional()
  date?: Date;

  
  @IsString()
  @IsOptional()
  description?: string;
}
