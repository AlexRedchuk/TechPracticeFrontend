import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TourService } from '../services/tour/tour.service';
import { OrderLogService } from '../services/orderLog/order-log.service';
import { Tour } from '../models/Tour';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { OrderLog } from '../models/OrderLog';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-tour-seemore',
  templateUrl: './tour-seemore.component.html',
  styleUrls: ['./tour-seemore.component.scss']
})
export class TourSeemoreComponent implements OnInit {

  currentCourse: number;
  loadingFlag = false;
  isOrdered = false;
  tour: Tour;
  user: User;
  message = '';
  alert = false;
  type = '';
  constructor(private route: ActivatedRoute,
              private tourService: TourService,
              private auth: AuthenticationService,
              private orderLogService: OrderLogService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getData(params.id);
      this.Ordered(params.id);
    });
    this.tourService.getUSDCourse().subscribe( data => {
      this.currentCourse = data[0].sale;
    });
  }

  getData(id) {
    this.tourService.getTourById(id).subscribe( data => {
      this.tour = data;
    });
  }

  Ordered(id) {
    this.auth.getUserId().subscribe( data => {
      this.userService.getUserById(data).subscribe(user => {
          this.user = user;
          // tslint:disable-next-line:no-shadowed-variable
          this.orderLogService.findOrder({ user: this.user._id, tour: id}).subscribe( data => {
            if (data.length === 1){
              this.isOrdered = true;
            } else {
              this.isOrdered = false;
            }
          });
      });
    });
  }
  addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }


  scrollUp(e) {
    window.scroll(0, 0);
  }


  showAlert(message: string, type: string) {
    this.message = message;
    this.type = type;
    this.alert = true;
  }


  orderTour(){
    if (this.auth.isAuthenticated()){
      this.loadingFlag = true;
      setTimeout(() => {
        this.orderLogService.addOrderLog({user: this.user._id, tour: this.tour._id}).subscribe(res => {
          console.log(res);
          this.isOrdered = true;
          this.showAlert('Тур оформлено', 'peace');
      });
    }, 3000);

    } else {
      this.showAlert('Для того щоб забронювати тур необхідно авторизуватися', 'danger');
    }
  }
}
