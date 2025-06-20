import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionVentaComponent } from './confirmacion-venta.component';

describe('ConfirmacionVentaComponent', () => {
  let component: ConfirmacionVentaComponent;
  let fixture: ComponentFixture<ConfirmacionVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
