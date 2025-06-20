// src/app/shared/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password_hash: string;
  enabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  /** /api/security/usuarios */
  private readonly base = `${environment.apiRoot}/security/usuarios`;

  constructor(private http: HttpClient) {}

  obtener(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.base}/${id}`);
  }
}
