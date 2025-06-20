import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LogoService {
  getLogoUrl(domain: string, options: Record<string, string> = {}): string {
    const params = new URLSearchParams({
      token: environment.logoDevToken,
      retina: 'true',
      format: 'png',
      ...options
    });
    return `https://img.logo.dev/${encodeURIComponent(domain)}?${params.toString()}`;
  }
}
