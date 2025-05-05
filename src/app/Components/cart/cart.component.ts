import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/Cart/cart.service';
import { SharedService } from '../../Services/Shared/shared.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartItems: any[] = [];
  totalQuantity:any;
  totalCost:any;

  constructor(private cartService:CartService,private sharedservice:SharedService){}

ngOnInit(): void {
  this.fetchCartItems();
  // this.sharedservice.cartRefresh$.subscribe(()=>
  //   {
  //     this.fetchCartItems();
  //   })
}
  fetchCartItems() {
    this.cartService.getCart().subscribe(
      (response: any) => {
        console.log('Cart summary:', response);
  
        this.cartItems = response.items;           // Items in the cart
        this.totalQuantity = response.totalQuantity;
        this.totalCost = response.totalCost;
       
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  increaseQuantity(item: any) {
    const newQuantity = item.quantity + 1;
    this.cartService.updateCart(item.bookId, newQuantity).subscribe(
      (response) => {
        console.log('Quantity increased:', response);
        // this.sharedservice.triggerCartRefresh();
        // this.sharedservice.updateCartCountFromBackend();
        this.fetchCartItems();
      },
      (error) => {
        console.error('Error increasing quantity:', error);
      }
    );
  }
  decreaseQuantity(item: any) {
    const newQuantity = item.quantity - 1;
  
    // If quantity is 1, and user clicks '-', we set quantity to 0 — backend deletes the item.
    if (newQuantity >= 0) {
      this.cartService.updateCart(item.bookId, newQuantity).subscribe(
        (response) => {
          console.log('Quantity decreased or item removed:', response);
          // this.sharedservice.triggerCartRefresh();
          // this.sharedservice.updateCartCountFromBackend();
          this.fetchCartItems();
        },
        (error) => {
          console.error('Error decreasing quantity or removing item:', error);
        }
      );
    }
  }
  
}
