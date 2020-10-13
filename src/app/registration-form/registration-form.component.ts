import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm: FormGroup;
  hide = true;
  logFlag = false;

  @Output() logSwitch: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() successRegister: EventEmitter<void> = new EventEmitter<void>();
  // tslint:disable-next-line: no-output-native
  @Output() close = new EventEmitter<void>();

  constructor(public service: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2)]),
      phone: new FormControl('', [Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      email: new FormControl('',
      [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.registrationForm.get('email').errors);
    if (this.registrationForm.valid) {
      console.log('Submit');
      this.service.register(this.registrationForm.value).subscribe( (res) => {
        console.log(res);
        this.successRegister.emit();
        this.switchToLog();
      }, (error => {
        console.log(error);
      }));
    }
  }

  switchToLog() {
    this.logFlag = true;
    this.logSwitch.emit(this.logFlag);
    this.close.emit();
  }
}
