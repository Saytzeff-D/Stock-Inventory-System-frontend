import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBackgroundComponent } from './layout-background.component';

describe('LayoutBackgroundComponent', () => {
  let component: LayoutBackgroundComponent;
  let fixture: ComponentFixture<LayoutBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
