// src/app/shared/models/producto.model.ts
export interface Producto {
  id?: number;                // lo asigna el backend
  nombre: string;
  descripcion: string;
  precio: number;
  cantidadDisponible: number; // <-- nuevo campo
  vendedorEmail: string;
}
