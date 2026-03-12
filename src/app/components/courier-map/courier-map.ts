import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CourierService } from '../../services/courier';

@Component({
  selector: 'app-courier-map',
  standalone: true,
  templateUrl: './courier-map.html',
  styleUrl: './courier-map.css',
})
export class CourierMap implements AfterViewInit {
  private map: any;
  private L: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private courierService: CourierService,
  ) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.L = await import('leaflet');

      if (this.L.default) {
        this.L = this.L.default;
      }

      this.initMap();
      this.loadCouriers();
    }
  }

  private initMap(): void {
    this.map = this.L.map('map').setView([-26.195, 27.873], 12);
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(this.map);
  }

  private loadCouriers(): void {
    if (!this.map) return;

    this.courierService.getAvailableCouriers().subscribe({
      next: (couriers) => {
        couriers.forEach((c) => {
          this.L.marker([c.latitude, c.longitude]).addTo(this.map).bindPopup(`<b>${c.name}</b>`);
        });
      },
      error: (err) => console.error('Error:', err),
    });
  }
}
