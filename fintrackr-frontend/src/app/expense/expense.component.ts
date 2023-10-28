import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: []
})
export class ExpenseComponent {
  @Input() expense: any;
  editing: boolean = false;
  editedDescription: string = '';
  editedAmount: number = 0;
  @Input() userId: string = '';


  constructor(private http: HttpClient) { }

  onEdit() {
    this.editing = true;
    this.editedDescription = this.expense.description;
    this.editedAmount = this.expense.amount;
  }

  onSubmitEdit() {
    const updatedData = {
      description: this.editedDescription,
      amount: this.editedAmount
    };

    this.updateExpense(updatedData);
    this.editing = false;
  }

  updateExpense(data: any) {
    const apiUrl = 'http://localhost:3000';
    this.http.put(`${apiUrl}/users/${this.expense.userId}/update_expense/${this.expense.id}`, data).subscribe(response => {
      console.log('Mise à jour réussie');
      // Mettre à jour localement les données de la dépense
      this.expense.description = this.editedDescription;
      this.expense.amount = this.editedAmount;
    }, error => {
      console.error('Erreur lors de la mise à jour de la dépense :', error);
    });
  }

  deleteExpense() {
    const apiUrl = 'http://localhost:3000';
    const userId = this.userId;
    const expenseId = this.expense._id;
    console.log('UserID:', this.expense.userId);
    console.log('ExpenseID:', this.expense.id);


    this.http.delete(`${apiUrl}/users/${userId}/update_expense/${expenseId}`)
      .subscribe(response => {
        console.log('Suppression réussie:', response);
      }, error => {
        // Gérez l'erreur
        console.error('Erreur lors de la suppression de la dépense:', error);
      });
  }
}
