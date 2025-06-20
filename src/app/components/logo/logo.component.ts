import { Component, Input, OnChanges } from '@angular/core';
import { LogoService } from '../../shared/services/logos.service';

@Component({
  selector: 'app-logo',
  template: `<img [src]="url" [alt]="domain + ' logo'" />`,
  styles: [`img { max-height: 100px; }`]
})
export class LogoComponent implements OnChanges {
  @Input() domain!: string;
  @Input() size: number = 128;
  url: string = '';

  constructor(private logoService: LogoService) {}

  ngOnChanges(): void {
    if (this.domain) {
      this.url = this.logoService.getLogoUrl(this.domain, { size: this.size.toString() });
    }
  }
}
