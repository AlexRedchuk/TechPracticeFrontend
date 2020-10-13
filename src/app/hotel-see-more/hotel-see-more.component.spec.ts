import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelSeeMoreComponent } from './hotel-see-more.component';

describe('HotelSeeMoreComponent', () => {
  let component: HotelSeeMoreComponent;
  let fixture: ComponentFixture<HotelSeeMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelSeeMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelSeeMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
