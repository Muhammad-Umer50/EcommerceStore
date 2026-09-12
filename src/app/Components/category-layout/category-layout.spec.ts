import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLayout } from './category-layout';

describe('CategoryLayout', () => {
  let component: CategoryLayout;
  let fixture: ComponentFixture<CategoryLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
