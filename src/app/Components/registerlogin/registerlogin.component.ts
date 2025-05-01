import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/User/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registerlogin',
  standalone: false,
  templateUrl: './registerlogin.component.html',
  styleUrl: './registerlogin.component.scss'
})
export class RegisterloginComponent  implements OnInit{
  isSignup: boolean = false;
  hidePassword: boolean = true;
  loginForm!: FormGroup;
  RegisterForm!: FormGroup;

  constructor(private user: UserService, private formbuilder: FormBuilder,private snackbar:MatSnackBar,private router:Router) {}

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  showSignup() {
    this.isSignup = true;
  }

  showLogin() {
    this.isSignup = false;
  }

 

  
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.RegisterForm = this.formbuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Za-z\s]+$/)]],
      lastname: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
      
    });
  }


  Login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // 💡 Trigger all field errors
      this.snackbar.open('Please fill the form correctly', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar']
      });
      return;
    }
  
    let reqData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
  
    this.user.Login(reqData).subscribe(
      (res: any) => {
        console.log('Login Success:', res);
        localStorage.setItem("token", res.token);
        this.router.navigate(['/dashboard']);
        this.snackbar.open('Login Successful!', 'Close', {
          duration: 1000,
          panelClass: ['success-snackbar']
        });
      },
      (error) => {
        console.error('Login Error:', error);
      }
    );
  }



  Register() {
  
    this.RegisterForm.markAllAsTouched();
  
    if (this.RegisterForm.invalid) {
      this.snackbar.open('Please fill the form correctly', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar']
      });
      return;
    }
  
    const reqData = this.RegisterForm.value;
  
    this.user.Register(reqData).subscribe({
      next: (res) => {
        console.log("Registration Successful:", res);
        // this.router.navigate(['/login']);
        this.showLogin();
        this.snackbar.open('User Registered Successfully!', 'Close', {
          duration: 1500,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        console.error("Registration Failed:", err);
      }
    });
  }

}
