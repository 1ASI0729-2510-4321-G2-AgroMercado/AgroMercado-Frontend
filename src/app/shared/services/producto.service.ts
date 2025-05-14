// src/app/shared/services/producto.service.ts
import { Injectable }        from '@angular/core';
import { HttpClient }        from '@angular/common/http';
import { Observable, map }   from 'rxjs';
import { environment }       from '../../../environments/environment';
import { Producto }          from '../models/producto.model';
import { Comentario }        from '../models/comentario.model';   // 👈 nuevo modelo

/** Forma exacta en que el back-end envía la lista */
interface CatalogoResponse {
  mensaje:  string;
  cantidad: number;
  productos: Producto[];
}

@Injectable({ providedIn: 'root' })
export class ProductoService {

  /**  → http://localhost:8080/api/catalog/productos */
  private readonly base = `${environment.apiRoot}/catalog/productos`;

  constructor(private http: HttpClient) {}

  /* ──────────── 📦 EXISTENTE ──────────── */
  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.base);
  }

  listarCatalogo(): Observable<Producto[]> {
    return this.http
      .get<CatalogoResponse>(this.base)
      .pipe(map(r => r.productos ?? []));
  }

  crear(p: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.base, p);
  }

  obtener(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.base}/${id}`);
  }
  /** POST /catalog/productos/{id}/comentarios */
  crearComentario(c: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.base}/${c.productoId}/comentarios`, c);
  }
}
