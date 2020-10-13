import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewService } from '../services/review/review.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Review } from '../models/Review';
import { UserService } from '../services/user/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendReview: EventEmitter<boolean> = new EventEmitter<boolean>();
  reviewForm: FormGroup;
  currentUser: User;
  constructor(private reviewService: ReviewService,
              private auth: AuthenticationService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.reviewForm = new FormGroup(
      {
        topic: new FormControl('', [Validators.required]),
        mark: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
        text: new FormControl('', [Validators.required])
      }
    );
  }

  closeWindow() {
    this.closeModal.emit();
  }

  send() {
    if (this.reviewForm.valid) {
      let review;
      this.auth.getUserId().subscribe( id => {
        this.userService.getUserById(id).subscribe( data => {
          review = {
            user: data._id,
            topic: this.reviewForm.get('topic').value,
            mark: this.reviewForm.get('mark').value,
            text: this.reviewForm.get('text').value
          };
          this.reviewService.addReview(review).subscribe( () => {
            this.sendReview.emit();
            this.closeModal.emit();
          });
        });
      });
    }
  }

}
