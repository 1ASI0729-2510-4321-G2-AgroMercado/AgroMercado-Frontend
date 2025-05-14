// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AnadirProductoComponent } from './pages/anadir-producto/anadir-producto.component';
import { ComprarProductoComponent } from './pages/comprar-producto/comprar-producto.component';

/* 👇 nueva importación */
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'comprar-producto', component: ComprarProductoComponent },
  { path: 'anadir-producto', component: AnadirProductoComponent },

  /* 🆕 nueva ruta añadida para el detalle */
  { path: 'detalle-producto/:id', component: DetalleProductoComponent }
];
