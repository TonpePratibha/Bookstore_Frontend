import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/User/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent  implements OnInit{
  resetPasswordForm!: FormGroup;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // GET token from query param like: /reset-password?token=abc123
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
      console.log('Token from route:', this.token); //  should now log the token
    });
  
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.passwordMatchValidator });
  }
    

 
  

 
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }



  resetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      this.snackbar.open('Please fill out the form correctly', 'Close', {
        duration: 2000,
      });
      return;
    }
  
    const newPassword = this.resetPasswordForm.value.newPassword;
    const resetData = { newPassword: newPassword };
  
    if (!this.token) {
      this.snackbar.open('Token is missing in URL', 'Close', { duration: 2000 });
      return;
    }
  
    this.userService.ResetPassword(resetData, this.token).subscribe({
      next: (res) => {
        this.snackbar.open('Password reset successful', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/registerlogin']);
      },
      error: (err) => {
        console.error('Reset error:', err);
        this.snackbar.open('Reset failed. Try again.', 'Close', {
          duration: 2000,
        });
      }
    });
  }
}
