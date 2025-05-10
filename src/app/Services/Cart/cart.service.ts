import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
token:any;
  constructor(private http :HttpService) {
    this.token = localStorage.getItem("token");
   }




  

 
 
 

  addToCart(bookId:number) {
    let headers = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
     
    return this.http.PostService(`https://localhost:7264/api/cart?bookId=${bookId}`,null,true, headers);
  }

  getCart(){
    let headers={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${this.token}`
  
      })
  
    };
    return this.http.getService("https://localhost:7264/api/cart",true,headers);
  }

  updateCart(bookId:number,quantity:number){

    let headers={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${this.token}`
  
      })};
      return this.http.putService(`https://localhost:7264/api/cart/${bookId}?quantity=${quantity}`,null,true,headers);
  }

  removeItem(bookId:number){
    let headers={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${this.token}`
  
      })};
      return this.http.deleteService(`https://localhost:7264/api/cart/${bookId}`,true,headers);
  }

  
  
  
  

}
