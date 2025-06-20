// src/app/shared/models/comentario.model.ts

export interface Comentario {
  id: number;
  productoId: number;
  vendedorEmail: string;
  compradorEmail: string;
  puntuacion: number;
  comentario: string;
  fechaCalificacion: string; // como viene de backend, es ISO string
}

