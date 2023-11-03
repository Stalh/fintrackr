import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface CustomJwtPayload {
  username: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../styles.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 })),
      ]),
    ]),

  ]
})
export class HomeComponent implements OnInit {
  user: any;
  newExpenseDescription: string = '';
  newExpenseAmount: number = 0;
  newExpenseDate: Date = new Date();
  invalidAmount: boolean = false;
  showModal: boolean = false;
  showAddBalanceModal: boolean = false;
  addBalanceAmount: number = 0;
  showAdvice: boolean = false;
  financialAdvices = [
    // Conseils d'économie
    {
      title: 'Construire un fonds d\'urgence',
      content: 'Commencez par mettre de côté suffisamment d\'argent pour couvrir au moins 3-6 mois de dépenses en cas d\'imprévu. Cela peut vous aider à éviter d\'emprunter en cas de coup dur.',
      type: 'saving'
    },
    {
      title: 'Réviser les abonnements',
      content: 'Passez en revue vos abonnements mensuels et annulez ceux que vous n\'utilisez pas ou peu. Les petites économies peuvent s\'ajouter à de grandes sommes au fil du temps.',
      type: 'saving'
    },

    // Conseils d'investissement
    {
      title: 'Planifier pour la retraite',
      content: 'Il n\'est jamais trop tôt pour commencer à épargner pour la retraite. Profitez des comptes de retraite fiscalement avantageux comme les 401(k) ou les IRA.',
      type: 'investment'
    },
    {
      title: 'Comprendre le risque',
      content: 'Avant d\'investir, évaluez votre tolérance au risque. Investir toujours dans des actifs qui correspondent à votre niveau de confort et à vos objectifs à long terme.',
      type: 'investment'
    },

    // Conseils de budget
    {
      title: 'Suivi des dépenses',
      content: 'Utilisez des applications de gestion de finances personnelles pour suivre où va votre argent. Cela peut vous aider à identifier et à réduire les dépenses inutiles.',
      type: 'budgeting'
    },
    {
      title: 'Fixer des objectifs financiers',
      content: 'Avoir des objectifs financiers clairs peut vous motiver à gérer votre argent de manière plus responsable. Définissez des objectifs à court et à long terme et élaborez un plan pour les atteindre.',
      type: 'budgeting'
    }
  ];
  polarAreaChartData: any;
  currentAdviceIndex = 0;
  chartOptions: any;

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (!username) {
      this.router.navigate(['/login']);
    } else {
      this.fetchUserData();
    }
    this.cycleAdvices();
    this.setupChartOptions();
  }

  setupChartOptions(): void {
    this.chartOptions = {
      scales: {
        r: {
          angleLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: true
        }
      }
    };
  }

  cycleAdvices(): void {
    setInterval(async () => {
      await Promise.resolve();
      this.currentAdviceIndex = (this.currentAdviceIndex + 1) % this.financialAdvices.length;
    }, 5000);
  }


  isAdviceVisible(index: number): boolean {
    return index === this.currentAdviceIndex;
  }

  fetchUserData(): void {
    const username = localStorage.getItem('username');
    if (username) {
      const apiUrl = 'http://localhost:3000';
      this.http.get(`${apiUrl}/users/${username}`).subscribe(data => {
        this.user = data;
        this.processExpensesForChart(); // Traitement des dépenses pour le graphique
      }, error => {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
      });
    } else {
      console.warn('No username found in localStorage.');
    }
  }

  processExpensesForChart(): void {
    const ranges = {
      '0-10': 0,
      '10-50': 0,
      '50-100': 0,
      '100+': 0
    };

    if (this.user && this.user.expenses) {
      this.user.expenses.forEach((expense: { amount: any; }) => {
        const amount = expense.amount;
        if (amount <= 10) ranges['0-10']++;
        else if (amount <= 50) ranges['10-50']++;
        else if (amount <= 100) ranges['50-100']++;
        else ranges['100+']++;
      });
    }

    this.polarAreaChartData = {
      datasets: [{
        data: [
          ranges['0-10'],
          ranges['10-50'],
          ranges['50-100'],
          ranges['100+']
        ],
        backgroundColor: [
          "#FF6384",
          "#4BC0C0",
          "#FFCE56",
          "#E7E9ED"
        ],
        label: 'Dépenses'
      }],
      labels: [
        '0 - 10€',
        '10 - 50€',
        '50 - 100€',
        '100€ et plus'
      ]
    };
  }

  getIconClass(type: string): string {
    const iconMap: { [key: string]: string } = {
      'saving': 'fas fa-piggy-bank',
      'investment': 'fas fa-chart-line',
      'budgeting': 'fas fa-wallet',
    };

    return iconMap[type] || 'fas fa-info-circle';
  }

  onAddBalance(): void {
    if (this.addBalanceAmount > 0) {
      this.userService.addBalance(this.user._id, this.addBalanceAmount).subscribe(() => {
        this.fetchUserData(); // Pour mettre à jour la balance affichée
        this.showAddBalanceModal = false;
      });
    }
  }

  onAddExpense(): void {
    console.log('Montant:', this.newExpenseAmount);
    this.invalidAmount = false;

    if (this.newExpenseAmount <= 0) {
      this.invalidAmount = true;
      return;
    }

    const expenseData = {
      description: this.newExpenseDescription,
      amount: this.newExpenseAmount,
      date: this.newExpenseDate
    };

    this.userService.addExpense(this.user._id, expenseData).subscribe(response => {
      console.log('Dépense ajoutée avec succès:', response);
      this.fetchUserData();
    }, error => {
      console.error('Erreur lors de l\'ajout de la dépense:', error);
    });
  }


  onExpenseDeleted(): void {
    this.fetchUserData();
  }

  onExpenseUpdated(): void {
    this.fetchUserData();
  }

}
