import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <input [(ngModel)]="creds.username" placeholder="Username" />
      <input [(ngModel)]="creds.password" type="password" placeholder="Password" />
      <button (click)="onLogin()">Login</button>
    </div>
  `,
})
export class LoginComponent {
  creds = { username: '', password: '' };

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    this.auth.login(this.creds).subscribe({
      next: () => {
        //this.router.navigate(['/map']);
        this.router.navigate(['/couriers']);
      },
      error: (err) => console.error('Login failed', err),
    });
  }
}
