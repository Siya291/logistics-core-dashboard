import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  creds = { username: '', password: '' };
  loading = false;
  error = false;
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    this.loading = true;
    this.error = false;

    this.auth.login(this.creds).subscribe({
      next: () => {
        this.router.navigate(['/couriers']);
      },
      error: (err) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = 'Invalid username or password. Please try again.';
        console.error('Login failed', err);
      },
    });
  }
}
