import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Courier } from '../../models/courier';
import { CourierService } from '../../services/courier';

@Component({
  selector: 'app-courier-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courier-detail.component.html',
  styleUrls: ['./courier-detail.component.css'],
})
export class CourierDetailComponent implements OnInit {
  courier: Courier | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courierService: CourierService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.fetchCourierDetails(id);
    } else {
      this.loading = false;
    }
  }

  fetchCourierDetails(id: number): void {
    this.loading = true;
    this.courierService.getCourierById(id).subscribe({
      next: (data) => {
        this.courier = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  goToMap() {
    if (this.courier) {
      this.router.navigate(['/map'], {
        queryParams: {
          id: this.courier.id,
          lat: this.courier.latitude,
          lng: this.courier.longitude,
        },
      });
    }
  }
}
