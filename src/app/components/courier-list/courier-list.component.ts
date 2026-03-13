import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Courier } from '../../models/courier';
import { CourierService } from '../../services/courier';

@Component({
  selector: 'app-courier-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './courier-list.component.html',
  styleUrls: ['./courier-list.component.css'],
})
export class CourierListComponent implements OnInit {
  allCouriers: Courier[] = [];
  filteredCouriers: Courier[] = [];
  loading = true;
  searchText = '';
  sortAsc = true;

  constructor(
    private courierService: CourierService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.courierService.getAvailableCouriers().subscribe({
      next: (data: any) => {
        this.allCouriers = Array.isArray(data) ? data : [data];
        this.filteredCouriers = [...this.allCouriers];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('API Error:', err);
        this.loading = false;
      }
    });
  }

  applyFilter() {
    const term = this.searchText.toLowerCase();
    this.filteredCouriers = this.allCouriers.filter(c =>
      c.name.toLowerCase().includes(term) || c.status.toLowerCase().includes(term)
    );
  }

  sortData(key: keyof Courier) {
    this.sortAsc = !this.sortAsc;
    this.filteredCouriers.sort((a, b) => {
      const valA = a[key] ?? '';
      const valB = b[key] ?? '';
      const comparison = valA > valB ? 1 : -1;
      return this.sortAsc ? comparison : -comparison;
    });
  }

  viewCourier(id: number) {
    this.router.navigate(['/courier', id]);
  }

  loadData() {
    this.fetchData();
  }
}
