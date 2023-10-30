import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('jwt');
    this.username = localStorage.getItem('username');
  }

  logout(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      }
    });
  }
}
