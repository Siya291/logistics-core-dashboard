import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Courier } from '../models/courier';
import { environment } from '../../environments.environment';

@Injectable({
  providedIn: 'root',
})
export class CourierService {
  private apiUrl = `${environment.apiUrl}/couriers`;

  constructor(private http: HttpClient) {}

  // Get all couriers for the active tenant
  getCouriers(): Observable<Courier[]> {
    return this.http.get<Courier[]>(this.apiUrl);
  }

  // Save a new courier
  createCourier(courier: Partial<Courier>): Observable<Courier> {
    return this.http.post<Courier>(this.apiUrl, courier);
  }
}
