import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSeeMoreComponent } from './review-see-more.component';

describe('ReviewSeeMoreComponent', () => {
  let component: ReviewSeeMoreComponent;
  let fixture: ComponentFixture<ReviewSeeMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewSeeMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSeeMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
