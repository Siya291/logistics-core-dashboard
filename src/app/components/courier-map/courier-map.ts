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
import { interval, Subscription, switchMap, startWith } from 'rxjs';

@Component({
  selector: 'app-courier-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="map-controls">
        <h2>Live Tracking</h2>
        <p *ngIf="selectedCourierId">Status: <span class="live-indicator">● LIVE UPDATING</span></p>
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
      .live-indicator {
        color: #28a745;
        font-weight: bold;
        animation: blink 1.5s infinite;
      }
      @keyframes blink {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
        100% {
          opacity: 1;
        }
      }
    `,
  ],
})
export class CourierMap implements OnInit, AfterViewInit, OnDestroy {
  private map: any;
  private marker: any;
  private L: any; // We'll store the Leaflet instance here
  private updateSubscription!: Subscription;
  selectedCourierId: number | null = null;
  isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private courierService: CourierService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // Check if we are in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.selectedCourierId = Number(params['id']);
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      // Dynamic import of Leaflet - This is the "Magic" part
      this.L = await import('leaflet');

      this.initMap();

      if (this.selectedCourierId) {
        this.startLiveTracking();
      }
    }
  }

  private initMap(): void {
    this.map = this.L.map('map').setView([-26.2041, 28.0473], 13);
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);
  }

  private startLiveTracking(): void {
    this.updateSubscription = interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.courierService.getCourierById(this.selectedCourierId!)),
      )
      .subscribe({
        next: (courier) => {
          this.updateMarker(courier.latitude, courier.longitude, courier.name);
        },
        error: (err) => console.error('Tracking Error:', err),
      });
  }

  private updateMarker(lat: number, lng: number, name: string): void {
    if (!this.map || !this.L) return;

    const coords: [number, number] = [lat, lng];

    if (!this.marker) {
      this.marker = this.L.marker(coords).addTo(this.map);
      this.map.setView(coords, 16);
    } else {
      this.marker.setLatLng(coords);
    }

    this.marker
      .bindPopup(`<b>${name}</b><br>Updated: ${new Date().toLocaleTimeString()}`)
      .openPopup();
    this.cdr.detectChanges();
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
