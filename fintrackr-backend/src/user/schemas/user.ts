import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './expense';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
})
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string; // Ceci sera le mot de passe haché

  @Prop({
    type: Number,
    default: 0,
  })
  balance: number;

  @Prop({
    type: [ExpenseSchema], // Imbriquer le schéma de dépenses ici
    default: [],
  })
  expenses: Expense[];
}

export const UserSchema = SchemaFactory.createForClass(User);
