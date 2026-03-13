import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierRegistrationComponent } from './courier-registration.component';

describe('CourierRegistrationComponent', () => {
  let component: CourierRegistrationComponent;
  let fixture: ComponentFixture<CourierRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourierRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourierRegistrationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
