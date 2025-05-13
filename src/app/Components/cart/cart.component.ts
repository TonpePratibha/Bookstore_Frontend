import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/Cart/cart.service';
import { SharedService } from '../../Services/Shared/shared.service';
import { OrderService } from '../../Services/Order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

import { Router } from '@angular/router';

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
  CustomerForm!: FormGroup;
  addressPanelOpen = false;
  summeryPanelOpen =false;

  constructor(private cartService:CartService,private sharedservice:SharedService,private orderservice:OrderService,
    private formbuilder:FormBuilder,private snackbar:MatSnackBar,private router :Router,private snackBar:MatSnackBar,private changedetector:ChangeDetectorRef){}

ngOnInit(): void {
  this.fetchCartItems();
  this.sharedservice.cartRefresh$.subscribe(()=>
    {
      this.fetchCartItems();
    })
  
  this.CustomerForm = this.formbuilder.group({
    fullname: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Za-z\s]+$/)]],
    mobile: ['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
    address: ['',Validators.required],
    city: ['', [Validators.required, Validators.minLength(4)]],
    state:['', [Validators.required,Validators.pattern(/^[A-Za-z\s]+$/)]],
   type:['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Za-z\s]+$/)]],
    
  });
}








  fetchCartItems() {
    this.cartService.getCart().subscribe(
      (response: any) => {
        console.log('Cart summary:', response);
  
       this.cartItems = response.items;   
           //this.cartItems = [...response.items];         // Items in the cart
          
        this.totalQuantity = response.totalQuantity;
        this.totalCost = response.totalCost;
        this.changedetector.detectChanges();
       
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
        this.sharedservice.triggerCartRefresh();
        this.sharedservice.updateCartCountFromBackend();
        // this.fetchCartItems();
      },
      (error) => {
        console.error('Error increasing quantity:', error);
      }
    );
  }
  decreaseQuantity(item: any) {
    const newQuantity = item.quantity - 1;
   newQuantity<=0?0:newQuantity;
    // If quantity is 1, and user clicks '-', we set quantity to 0 — backend deletes the item.
    if (newQuantity >= 0) {
      this.cartService.updateCart(item.bookId, newQuantity).subscribe(
        (response) => {
          console.log('Quantity decreased or item removed:', response);
          // this.sharedservice.triggerCartRefresh();
          // this.sharedservice.updateCartCountFromBackend();
          this.fetchCartItems();
          //  this.router.navigate(['/dashboard/cart']);
       

        
        },
        (error) => {
          console.error('Error decreasing quantity or removing item:', error);
        }
      );
    }
  }
  
trackByBookId(index: number, item: any): number {
  return item.bookId;
}


  
  addCustomerDetails(){
    this.CustomerForm.markAllAsTouched();
  
    if (this.CustomerForm.invalid) {
      this.snackbar.open('Please fill the form correctly', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar']
      });
      return;
    }
  
    const reqData = this.CustomerForm.value;
  
    this.orderservice.addCustomerDetails(reqData).subscribe({
      next: (res) => {
        console.log("Successful:", res);
        // this.router.navigate(['/login']);
        
        
        this.snackbar.open('Customer details added Successfully!', 'Close', {
          duration: 1500,
          panelClass: ['success-snackbar']
        });
        this.openSummeryPanel();
      },
      
      error: (err) => {
        console.error(" Failed to add customerdetails", err);
      }
    });
  }

    
  

  placeOrder(){
    this.orderservice.placeOrder().subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
        this.snackBar.open("Order placed successfully:!", '', { duration: 2000 });
        this.router.navigate(['/dashboard/success']);

        this.closeSummeryPanel();
      },
      error: (error) => {
        console.error('Error placing order:', error);
      }
    });

    
  }





removeItem(bookId: number): void {
 
    this.cartService.removeItem(bookId).subscribe({
      next: (response) => {
        console.log('Item removed successfully:', response);
        
      //  this.sharedservice.triggerCartRefresh();
        this.fetchCartItems();
        
       
        this.snackbar.open('Item removed from cart', 'Close', {
          duration: 2000,
          panelClass: ['success-snackbar'],
        });
      },
      error: (error) => {
        console.error('Error removing item:', error);
        
       
        this.snackbar.open('Failed to remove item from cart', 'Close', {
          duration: 2000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }




  openSummeryPanel(){
    this.addressPanelOpen=true;
    this.summeryPanelOpen=true;
  }
  closeExpansion(){
    this.addressPanelOpen=false;
  }

  openAddressPanel(){
    this.addressPanelOpen=true;
  }
  closeSummeryPanel(){
this.summeryPanelOpen=false;
  }
}
