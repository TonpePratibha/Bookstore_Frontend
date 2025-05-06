import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
token:any;
  constructor(private http:HttpService) {
    this.token=localStorage.getItem("token");
   }


  addToWishlist(bookId:number) {
    let headers = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
     
    return this.http.PostService(`https://localhost:7264/api/wishlist?bookId=${bookId}`,null,true, headers);
  }

  removeFromWishlist(bookId:number){

    let headers = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
     
    return this.http.deleteService(`https://localhost:7264/api/wishlist?bookId=${bookId}`,true, headers);
  
  }

  getWishList(){
    let headers = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
     
    return this.http.getService("https://localhost:7264/api/wishlist",true, headers);
  
  }

}
