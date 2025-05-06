import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
token:any;
  constructor(private http:HttpService) { 
this.token=localStorage.getItem("token");
  }


  placeOrder(){
   
      let headers = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
       
      return this.http.PostService("https://localhost:7264/api/orders/placeorder",null,true, headers);
    }


    addCustomerDetails(reqData:any){
      let headers = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };
       
      return this.http.PostService("https://localhost:7264/api/customer",reqData,true, headers);
    }
  
getOrder(){
  let headers = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };
   
  return this.http.getService("https://localhost:7264/api/orders",true, headers);

}

  
}
