// src/app/shared/services/rating.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Comentario } from '../models/comentario.model';

/** DTO para crear un nuevo comentario */
export interface CrearComentarioDto {
  productoId: number;
  vendedorEmail: string;
  compradorEmail: string;
  puntuacion: number;
  comentario: string;
}

@Injectable({ providedIn: 'root' })
export class RatingService {
  /** /api/ratings */
  private readonly base = `${environment.apiRoot}/ratings`;

  constructor(private http: HttpClient) {}

  /** Listar comentarios de un producto */
  listarPorProducto(productoId: number): Observable<Comentario[]> {
    return this.http.get<{ calificaciones: Comentario[] }>(`${this.base}/producto/${productoId}`)
      .pipe(map(r => r.calificaciones ?? []));
  }

  /** Crear un comentario nuevo */
  crear(dto: CrearComentarioDto): Observable<any> {
    return this.http.post(`${this.base}`, dto);
  }
}
