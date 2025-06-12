import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { user } from '../../../models/user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ["./user-management.component.css"],
})
export class UserManagementComponent implements OnInit {
  currentUser: any;
  constructor(private http: HttpClient, private router: Router) {
    const dataStr = localStorage.getItem('data');
    if (dataStr) {
      this.currentUser = JSON.parse(dataStr);
    }
  }

  users: any[] = [];
  displayedColumns: any;

  // token: string | undefined

  ngOnInit(): void {
    try {
      this.http.post<{ token: string }>(
        'https://kidscanvasproject.onrender.com/api/Auth/get-admin-token',
        {
          userName: this.currentUser.userName,
          phone: this.currentUser.phone,
          email: this.currentUser.email,
          password: this.currentUser.password
        }
      ).subscribe({
        next: res => {
          const token = res.token;
          localStorage.setItem('token', token);

          // Use the token to fetch users
          const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
          this.http.get('https://kidscanvasproject.onrender.com/api/Users', { headers })
            .subscribe(users => {
              this.users = users as any[];
              // this.router.navigate(["/home"]);
            }, error => {
              console.error('שגיאה בשליפת המשתמשים:', error);
            });
        },
        error: error => {
          console.error('שגיאה בקבלת הטוקן:', error);
        }
      });
    } catch (error) {
      console.error('שגיאה בקבלת הטוקן:', error);
    }
  }
}
