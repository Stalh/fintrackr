import { Expense } from "./expense.model";

export class User {
    _id?: any;
    username: string;
    password: string;
    balance: number;
    expenses: Expense[];
  
    constructor(username: string, password: string, balance: number = 0, expenses: Expense[] = []) {
      this.username = username;
      this.password = password;
      this.balance = balance;
      this.expenses = expenses;
    }
  }