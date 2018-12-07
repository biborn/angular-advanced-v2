import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { AuthRememberComponent } from './auth-remember/auth-remember.component';
import { AuthMessageComponent } from './auth-message/auth-message.component';

import { User } from './auth-form.interface';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit, AfterContentInit, AfterViewInit {

  showMessage: boolean;

  @ViewChild(AuthMessageComponent) message: AuthMessageComponent;

  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

  ngAfterContentInit() {
    if (this.remember) {
      this.remember.forEach((item) => {
        item.checked.subscribe((checked: boolean) => this.showMessage = checked);
      });
    }
  }

  ngAfterViewInit() {
    if (this.message) {
      console.log(this.message);
      this.message.days = 10;
    }
  }

}
