import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Review } from '../models/Review';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { UserService } from '../services/user/user.service';
import { User } from '../models/User';
import { ReviewService } from '../services/review/review.service';

@Component({
  selector: 'app-review-see-more',
  templateUrl: './review-see-more.component.html',
  styleUrls: ['./review-see-more.component.scss']
})
export class ReviewSeeMoreComponent implements OnInit {

  notContainer: false;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClose = new EventEmitter<boolean>();
  @Input() currentReview: Review;
  @Output() reviewDeleted = new EventEmitter<string>();
  user: User;



  constructor(public auth: AuthenticationService,
              private userService: UserService,
              private reviewService: ReviewService) { }

  ngOnInit(): void {

    if (this.auth.isAuthenticated()) {
      this.auth.getUserId().subscribe( data => {
      this.userService.getUserById(data).subscribe(user => {
          this.user = user;
        });
      });
    }
  }
  deleteReview() {
    if (confirm('Ви дійсно хочете видалити свій відгук?')){
      this.reviewService.deleteReview(this.currentReview._id).subscribe( () => {
        this.onClose.emit();
        this.reviewDeleted.emit(this.currentReview._id);
      });
    }
  }

}
