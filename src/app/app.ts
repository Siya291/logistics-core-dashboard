import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav style="padding: 1rem; background: #3f51b5; color: white;">
      <a routerLink="/couriers" style="color: white; margin-right: 15px; text-decoration: none;">Couriers</a>
      <a routerLink="/map" style="color: white; text-decoration: none;">Map</a>
    </nav>
    <main style="padding: 20px;">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class App {}
