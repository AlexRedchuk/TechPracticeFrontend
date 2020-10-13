import { Component, OnInit, OnChanges, DoCheck, AfterViewInit } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './services/user/user.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User = null;
  title = 'client';
  message = '';
  type = '';
  alert = false;
  logModal = false;
  regModal = false;
  constructor(public auth: AuthenticationService,
              private router: Router,
              private userService: UserService) {
                // tslint:disable-next-line:only-arrow-functions
                this.router.routeReuseStrategy.shouldReuseRoute = function(){
                  return false;
               };
                this.router.events.subscribe((evt) => {
                if (evt instanceof NavigationEnd) {
                   // trick the Router into believing it's last link wasn't previously loaded
                   this.router.navigated = false;
                   // if you need to scroll back to top, here is the right place
                }
            });
  }

  ngOnInit(): void {
    this.login();
  }

  logout() {
    setTimeout( () => {
      this.auth.logout();
      this.user = null;
      if (location.pathname !== '/homepage'){
        this.router.navigate([location.pathname]);
      }
      else {
        this.router.navigate(['']);
      }
    }, 600);
  }

  login() {
    if (this.auth.isAuthenticated()) {
    this.auth.getUserId().subscribe( data => {
    this.userService.getUserById(data).subscribe(user => {
        this.user = user;
      });
    });
  }
}
refresh() {
  this.login();
}
 successRegister() {
  this.showAlert('Реєстрацію успішно завершено. Будь ласка авторизуйтесь', 'peace');
 }


 showAlert(message: string, type: string) {
  this.message = message;
  this.type = type;
  this.alert = true;
}


scrollUp(e) {
  window.scroll(0, 0);
}
  getFlagReg(flag: boolean) {
    this.regModal = flag;
  }

  getFlagLog(flag: boolean) {
    this.logModal = flag;
  }
}
