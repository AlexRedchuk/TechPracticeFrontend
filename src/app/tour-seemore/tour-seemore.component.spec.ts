import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourSeemoreComponent } from './tour-seemore.component';

describe('TourSeemoreComponent', () => {
  let component: TourSeemoreComponent;
  let fixture: ComponentFixture<TourSeemoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourSeemoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourSeemoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
