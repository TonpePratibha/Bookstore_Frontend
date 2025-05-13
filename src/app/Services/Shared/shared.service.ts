import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../Cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private searchQuerySubject = new BehaviorSubject<string>('');  //search  stores latest value
  searchQuery$ = this.searchQuerySubject.asObservable();  //readonly for consumer

 
  private cartCount = new BehaviorSubject<number>(0);  //cart
  cartCount$ = this.cartCount.asObservable();

private cartRefreshTrigger=new BehaviorSubject<void>(undefined)   //refresh
cartRefresh$=this.cartRefreshTrigger.asObservable();  

private firstname:string='';

 constructor(private cartService:CartService){}


setFirstname(name:string){
  this.firstname=name;
   localStorage.setItem('firstname', name);
}
getFirstName():string{
if (!this.firstname) {
      this.firstname = localStorage.getItem('firstname') || '';
    }
    return this.firstname;
  
}


 
  
  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);  //emit stream of data used to update
  }


  //cartdetails


triggerCartRefresh(){
  this.cartRefreshTrigger.next();
}





  updateCartCountFromBackend() {
    this.cartService.getCart().subscribe({
      next: (response: any) => {                      
        const count = response.items ? response.items.length : 0;
        this.cartCount.next(count);
      },
      error: () => {
        this.cartCount.next(0); // fallback 
      }
    });

  }

 
}
