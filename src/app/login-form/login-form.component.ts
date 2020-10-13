import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() regSwitch: EventEmitter<boolean> = new EventEmitter<boolean>();
  // tslint:disable-next-line: no-output-native
  @Output() close = new EventEmitter<void>();
  @Output() login = new EventEmitter<void>();
  loginForm: FormGroup;
  invalid = false;
  regFlag = false;
  constructor(public service: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.minLength(6), Validators.required])
      }
    );
  }


  onSubmit() {
    if (!this.loginForm.invalid){
      this.service.login(this.loginForm.value).subscribe((res) => {
          this.login.emit();
          this.router.navigate([location.pathname]);
          this.close.emit();
        }
      , (error => {
        this.invalid = true;
        this.loginForm.get('password').reset();
        console.log(error);
      }));
    }
  }
  forgotPassword() {
    return alert('Ця функція поки не доступна');
  }

  switchToReg() {
    this.regFlag = true;
    this.regSwitch.emit(this.regFlag);
    this.close.emit();
  }

}
