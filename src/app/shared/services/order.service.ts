// src/app/shared/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/** DTO para crear una orden */
export interface NuevaOrdenDto {
  productoId: number;
  compradorEmail: string;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  /** /api/orders */
  private readonly base = `${environment.apiRoot}/orders`;

  constructor(private http: HttpClient) {}

  /** Crear una nueva orden */
  crear(dto: NuevaOrdenDto): Observable<any> {
    return this.http.post(`${this.base}`, dto);
  }
}
