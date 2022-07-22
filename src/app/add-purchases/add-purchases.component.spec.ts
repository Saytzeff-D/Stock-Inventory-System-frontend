import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasesComponent } from './add-purchases.component';

describe('AddPurchasesComponent', () => {
  let component: AddPurchasesComponent;
  let fixture: ComponentFixture<AddPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
