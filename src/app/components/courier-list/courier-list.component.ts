import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Courier } from '../../models/courier';
import { CourierService } from '../../services/courier';

@Component({
  selector: 'app-courier-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './courier-list.component.html',
  styleUrls: ['./courier-list.component.css'],
})
export class CourierListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'location'];
  dataSource: Courier[] = [];
  loading = true;

  constructor(private courierService: CourierService) {}

  ngOnInit(): void {
    this.courierService.getCouriers().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  // To Refresh data without having to refresh the whole page
  loadData() {
    this.loading = true;
    this.courierService.getCouriers().subscribe((data) => {
      this.dataSource = data;
      this.loading = false;
    });
  }
}
