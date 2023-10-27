export class Expense {
    _id: any;
    amount: number;
    date: Date;
    description: string;
    
  constructor(amount: number, date: Date, description: string) {
    this.amount = amount;
    this.date = date;
    this.description = description;
  }
}