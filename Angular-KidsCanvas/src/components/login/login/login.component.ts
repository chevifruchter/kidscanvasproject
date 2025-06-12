import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { user } from '../../../models/user';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    // RouterLink,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: user | undefined;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      phone: ['', Validators.required]
      , email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user: user = this.loginForm.value;
      console.log('Form Data:', this.loginForm.value);
      localStorage.setItem('data', JSON.stringify(user));
      this.router.navigate(['/home']);
    }
  }
}
