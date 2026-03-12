import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierMap } from './courier-map';

describe('CourierMap', () => {
  let component: CourierMap;
  let fixture: ComponentFixture<CourierMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourierMap],
    }).compileComponents();

    fixture = TestBed.createComponent(CourierMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
