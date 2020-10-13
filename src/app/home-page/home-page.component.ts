import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { UserService } from '../services/user/user.service';
import { User } from '../models/User';
import { OrderLogService } from '../services/orderLog/order-log.service';
import { OrderLog } from '../models/OrderLog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  alert = false;
  message = '';
  type = '';
  user: User;
  orderLogs: OrderLog[];
  constructor(private auth: AuthenticationService,
              private userService: UserService,
              private orderLogService: OrderLogService,
              private router: Router) { }

  ngOnInit(): void {
    this.auth.getUserId().subscribe( data => {
      this.userService.getUserById(data).subscribe(user => {
          this.user = user;
      });
      this.orderLogService.findOrderLogByUserId(data).subscribe ( logs => {
        this.orderLogs = logs;
      });
    });
  }

  logout() {
      setTimeout(() => {
      this.auth.logout();
      this.user = null;
      window.location.reload();
      this.router.navigate(['']);
    }, 500);
  }

  showAlert(message: string, type: string) {
    this.message = message;
    this.type = type;
    this.alert = true;
  }

  cancelOrder(id) {
    if (confirm('Ви точно хочете відмінити цей тур?')){
      this.orderLogs = this.orderLogs.filter( t => t._id !== id);
      this.showAlert('Тур скасовано', 'peace');
      this.orderLogService.deleteOrderLog(id).subscribe( () => {
      });
    }

  }


}
