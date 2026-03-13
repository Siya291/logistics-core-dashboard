import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDetailComponent } from './courier-detail.component';

describe('CourierDetailComponent', () => {
  let component: CourierDetailComponent;
  let fixture: ComponentFixture<CourierDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourierDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourierDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
