import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: []
})
export class ExpenseComponent {
  @Input() expense: any;
  @Input() userId: string = '';
  @Output() expenseDeleted = new EventEmitter<void>();
  editing: boolean = false;
  editedDescription: string = '';
  editedAmount: number = 0;
  @Output() expenseUpdated = new EventEmitter<void>();
  invalidAmount: boolean = false;


  constructor(private http: HttpClient) { }

  onEdit() {
    this.editing = true;
    this.editedDescription = this.expense.description;
    this.editedAmount = this.expense.amount;
  }

  onSubmitEdit() {
    this.invalidAmount = false;

    if (this.editedAmount <= 0) {
      this.invalidAmount = true;
      return;
    }

    const updatedData = {
      description: this.editedDescription,
      amount: this.editedAmount
    };

    this.updateExpense(updatedData);
    this.editing = false;
  }


  updateExpense(data: any) {
    const apiUrl = 'http://localhost:3000';
    this.http.put(`${apiUrl}/users/${this.userId}/update_expense/${this.expense._id}`, data).subscribe(response => {
      console.log('Mise à jour réussie');
      this.expense.description = this.editedDescription;
      this.expense.amount = this.editedAmount;
      this.expenseUpdated.emit();
    }, error => {
      console.error('Erreur lors de la mise à jour de la dépense :', error);
    });

  }

  deleteExpense() {
    const apiUrl = 'http://localhost:3000';
    this.http.delete(`${apiUrl}/users/${this.userId}/update_expense/${this.expense._id}`)
      .subscribe(response => {
        console.log('Suppression réussie:', response);
        this.expenseDeleted.emit();
      }, error => {
        console.error('Erreur lors de la suppression de la dépense:', error);
      });
  }
}
