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



setFirstname(name: string) {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  this.firstname = capitalized;
  localStorage.setItem('firstname', capitalized);
}




getFirstName(): string {
  if (!this.firstname) {
    const stored = localStorage.getItem('firstname') || '';
    this.firstname = stored.charAt(0).toUpperCase() + stored.slice(1).toLowerCase();
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
