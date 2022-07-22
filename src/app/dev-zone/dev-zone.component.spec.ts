import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevZoneComponent } from './dev-zone.component';

describe('DevZoneComponent', () => {
  let component: DevZoneComponent;
  let fixture: ComponentFixture<DevZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
