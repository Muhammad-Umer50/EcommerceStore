import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLayout } from './cart-layout';

describe('CartLayout', () => {
  let component: CartLayout;
  let fixture: ComponentFixture<CartLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(CartLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
