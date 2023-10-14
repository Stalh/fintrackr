import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ExpenseDocument = Expense & Document;

@Schema({
  versionKey: false,
})
export class Expense {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: Number,
    required: true,
  })
  amount: number;

  @Prop({
    type: Date,
    required: true,
  })
  date: Date;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  description: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
