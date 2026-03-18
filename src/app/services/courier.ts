import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courier } from '../models/courier';
import { environment } from '../../environments.environment';

@Injectable({
  providedIn: 'root',
})
export class CourierService {
  private apiUrl = `${environment.apiUrl}/v1/couriers`;

  constructor(private http: HttpClient) {}

  // Get all couriers for the active tenant
  getAvailableCouriers(): Observable<Courier[]> {
    return this.http.get<Courier[]>(`${this.apiUrl}/available`);
  }

  // Get a specific courier by ID for the detail view
  getCourierById(id: number): Observable<Courier> {
    return this.http.get<Courier>(`${this.apiUrl}/${id}`);
  }

  // Save a new courier
  createCourier(courier: Partial<Courier>): Observable<Courier> {
    return this.http.post<Courier>(this.apiUrl, courier);
  }

  // Get all couriers
  getAllCouriers(): Observable<Courier[]> {
    return this.http.get<Courier[]>(`${this.apiUrl}/all`);
  }

  // Update status
  updateStatus(id: number, status: string): Observable<Courier> {
    return this.http.patch<Courier>(`${this.apiUrl}/${id}/status`, { status });
  }

  // Delete courier
  deleteCourier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
