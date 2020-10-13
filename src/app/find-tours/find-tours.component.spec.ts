import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindToursComponent } from './find-tours.component';

describe('FindToursComponent', () => {
  let component: FindToursComponent;
  let fixture: ComponentFixture<FindToursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindToursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
