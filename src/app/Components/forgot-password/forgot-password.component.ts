import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { UserService } from '../../Services/User/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
forgotForm!:FormGroup;

  constructor(private formbuilder:FormBuilder,private userservice :UserService,private snackbar:MatSnackBar){}

ngOnInit(): void {
  this.forgotForm=this.formbuilder.group({
    email:['',[Validators.required, Validators.email]],
  }
   
  )
 
  
}

ForgotPassword()
{
let reqData={
  email:this.forgotForm.value.email
}

this.userservice.ForgotPassword(reqData).subscribe((response)=>{
   console.log(response);
   this.snackbar.open('Password reset email sent', 'Close', {
    duration: 2000,
  });
});
(err:any)=>
{
  console.log("error occured",err);
  this.snackbar.open('email sent failed. Try again.', 'Close', {
    duration: 2000,
  });
}

}
}
