import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousLoginComponent } from './anonymous-login.component';

describe('AnonymousLoginComponent', () => {
  let component: AnonymousLoginComponent;
  let fixture: ComponentFixture<AnonymousLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnonymousLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
