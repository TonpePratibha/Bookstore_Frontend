import { Component } from '@angular/core';

@Component({
  selector: 'app-registerlogin',
  standalone: false,
  templateUrl: './registerlogin.component.html',
  styleUrl: './registerlogin.component.scss'
})
export class RegisterloginComponent {
  isSignup: boolean = false;
  hidePassword: boolean = true;

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  showSignup() {
    this.isSignup = true;
  }

  showLogin() {
    this.isSignup = false;
  }





}
