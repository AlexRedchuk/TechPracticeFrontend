import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { TourService } from '../services/tour/tour.service';
import { TourGroup } from '../models/TourGroup';
import { ReviewService } from '../services/review/review.service';
import { Review } from '../models/Review';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

// Дані для турів
  tourLimit = 0;
  tours: TourGroup[];
  toursToShow: TourGroup[];

// Дані для відгуків
  reviewLimit = 0;
  reviews: Review[];
  reviewsToShow: Review[];

  currentCourse: number;
  currentUser: User;
  currentReview: Review;
  seeReview = false;
  alert = false;
  message = '';
  type: string;
  addReviewModal = false;
  constructor(private tourService: TourService,
              private reviewService: ReviewService,
              public auth: AuthenticationService,
              private userService: UserService) {
               }

  ngOnInit(): void {
    this.login();
    this.getReviews();
    this.tourService.groupByCountry().subscribe( data => {
      this.tours = data;
      this.tourLimit = (this.tours.length < 9) ? this.tours.length : 9;
      this.toursToShow = this.tours.slice(0, this.tourLimit);
    });
    this.tourService.getUSDCourse().subscribe( data => {
      this.currentCourse = data[0].sale;
    });
}


// Пагінація для турів
  showMoreTours() {
    if (this.tourLimit < this.tours.length && (this.tours.length - this.tourLimit) >= 3) {
      this.tourLimit += 3;
    }
    if (this.tourLimit < this.tours.length && (this.tours.length - this.tourLimit) < 3) {
      this.tourLimit += this.tours.length - this.tourLimit;
    }
    this.toursToShow = this.tours.slice(0, this.tourLimit);
  }

  getReviews() {
    this.reviewService.getReviews().subscribe( data => {
      this.reviews = data;
      this.reviewLimit = (this.reviews.length < 2) ? this.reviews.length + 1 : 2;
      this.reviewsToShow = this.reviews.slice(0, this.reviewLimit);
    });
  }

  refillReviews() {
    this.reviewService.getReviews().subscribe( data => {
      this.reviews = data;
      this.reviewLimit += 1;
      this.reviewsToShow = this.reviews.slice(0, this.reviewLimit );
      this.showAlert('Дякуємо за ваш відгук!)', 'peace');
    });
  }

  showMoreReviws() {
      this.reviewLimit += 2;
      this.reviewsToShow = this.reviews.slice(0, this.reviewLimit);
  }

  login() {
    if (this.auth.isAuthenticated()) {
    this.auth.getUserId().subscribe( data => {
    this.userService.getUserById(data).subscribe(user => {
        this.currentUser = user;
      });
    });
  }
}


  deleteReview(id: any) {
    this.reviews = this.reviews.filter( t => t._id !== id);
    if (this.reviewLimit !== 2 ) {
      this.reviewLimit -= 1;
    }
    this.reviewsToShow = this.reviews.slice(0, this.reviewLimit);
    this.showAlert('Відгук успішно видалено', 'peace');
  }

  closeReview(flag: boolean) {
    this.seeReview = flag;
  }

  scrollUp(e) {
    window.scroll(0, 0);
  }
  showReview(review: Review) {
    this.currentReview = review;
    this.seeReview = true;
  }

  addReviewClose(){
    this.addReviewModal = false;
  }

  showAlert(message: string, type: string) {
    this.alert = true;
    this.message = message;
    this.type = type;
  }

  sendReview() {
    if (this.auth.isAuthenticated()) {
      this.addReviewModal = true;
    }
    else {
      this.showAlert('Для того щоб залишити відгук необхідно авторизуватися', 'danger');
    }
  }
}
