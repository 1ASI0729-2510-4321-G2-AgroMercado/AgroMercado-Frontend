// src/app/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  mostrarFormularioContacto = false;

  simularMeGusta(): void {
    alert('¡Gracias por tu Me Gusta! 🚀');
  }

  simularSuscripcion(event: Event): void {
    event.preventDefault();
    alert('¡Gracias por suscribirte! 📩');
  }

  abrirFormularioContacto(): void {
    this.mostrarFormularioContacto = true;
  }

  cerrarFormularioContacto(event?: Event): void {
    if (event) event.preventDefault();
    this.mostrarFormularioContacto = false;
  }
}
