import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourierService } from '../../services/courier';
import { interval, Subscription } from 'rxjs';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-courier-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="map-controls">
        <h2>Live Tracking: Active Fleet</h2>
      </div>
      <div id="map" style="height: 600px; width: 100%;"></div>
    </div>
  `,
  styles: [
    `
      #map {
        border-radius: 8px;
        border: 2px solid #007bff;
      }
    `,
  ],
})
export class CourierMap implements OnInit, AfterViewInit, OnDestroy {
  private map: any;
  private L: any;
  private updateSubscription!: Subscription;
  private markers: Map<number, any> = new Map();
  selectedCourierId: number | null = null;
  isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private courierService: CourierService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedCourierId = params['id'] ? Number(params['id']) : null;
    });
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      this.L = await import('leaflet');
      this.initMap();

      if (this.selectedCourierId) {
        this.loadSingleCourier();
        this.updateSubscription = interval(10000).subscribe(() => this.loadSingleCourier());
      } else {
        this.loadAllCouriers();
        this.updateSubscription = interval(10000).subscribe(() => this.loadAllCouriers());
      }
    }
  }

  private initMap(): void {
    this.map = this.L.map('map').setView([-26.2041, 28.0473], 13);
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);
  }

  private loadSingleCourier(): void {
    if (!this.map || !this.selectedCourierId) return;

    this.courierService.getCourierById(this.selectedCourierId).subscribe({
      next: (courier) => {
        const coords: [number, number] = [courier.latitude, courier.longitude];
        if (this.markers.has(courier.id)) {
          this.markers.get(courier.id).setLatLng(coords);
        } else {
          const newMarker = this.L.marker(coords).addTo(this.map);
          newMarker.bindPopup(`<b>${courier.name} (Tracking)</b>`).openPopup();
          this.markers.set(courier.id, newMarker);
          this.map.setView(coords, 16); // Focus on the courier
        }
      },
    });
  }

  private loadAllCouriers(): void {
    if (!this.map || !this.L) return;

    this.courierService.getAvailableCouriers().subscribe({
      next: (couriers) => {
        couriers.forEach((courier) => {
          const coords: [number, number] = [courier.latitude, courier.longitude];

          if (this.markers.has(courier.id)) {
            // Update existing marker position
            this.markers.get(courier.id).setLatLng(coords);
          } else {
            // Create new marker for new courier
            const newMarker = this.L.marker(coords).addTo(this.map);
            newMarker.bindPopup(`<b>${courier.name}</b>`);
            this.markers.set(courier.id, newMarker);
          }
        });
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading fleet:', err),
    });
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    if (this.map) {
      this.map.remove();
    }
  }
}
