import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http: HttpService,private httpclient:HttpClient) {}

  Login(reqData: any) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
    };
    console.log("Sending Login Request: ", reqData);

    return this.http.PostService('https://localhost:7264/api/user/login', reqData, false, headers);
  }

 

  Register(reqData: any) {
    let headers = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json' 
      })
    };
    return this.http.PostService('https://localhost:7264/api/user', reqData, false, headers);
  }


  ForgotPassword(reqData:any){

    let headers = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json' 
      })
    };
    return this.http.PostService('https://localhost:7264/api/user/forgot-password', reqData, false, headers);

  }


  ResetPassword(reqData:any,token:string){

    let headers = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json' ,
        'Authorization':`Bearer${token}`
      })
    };
    return this.http.PostService('https://localhost:7264/api/user/reset-password', reqData, false, headers);

  }
}
