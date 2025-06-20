import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/* ---------- Tipos ---------- */
export interface Order {
  id?: number;
  productoId: number;
  compradorEmail: string;
  cantidad: number;
  fechaOrden: string;
  estado: string;
}

export interface NuevaOrdenDto {
  productoId: number;
  compradorEmail: string;
  cantidad: number;
}

/* ---------- Service ---------- */
@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly base = `${environment.apiRoot}/orders`;

  constructor(private http: HttpClient) {}

  /** Crear una nueva orden */
  crear(dto: NuevaOrdenDto): Observable<Order> {
    return this.http.post<Order>(this.base, dto);
  }

  /** Listar todas las órdenes */
  listarOrdenes(): Observable<Order[]> {
    return this.http.get<{ ordenes: Order[] }>(this.base)
      .pipe(map(r => r.ordenes ?? []));
  }

  /** Eliminar (o marcar entregada) una orden */
  eliminarOrden(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
