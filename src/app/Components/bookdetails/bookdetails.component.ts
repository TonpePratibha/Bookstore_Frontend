import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../Services/Book/book.service';
import { SharedService } from '../../Services/Shared/shared.service';
import { CartService } from '../../Services/Cart/cart.service';

@Component({
  selector: 'app-bookdetails',
  standalone: false,
  templateUrl: './bookdetails.component.html',
  styleUrl: './bookdetails.component.scss'
})
export class BookdetailsComponent implements OnInit{
  rating: number = 0;
  showLogoutText = false;
  book:any;
  isAddedToBag: boolean = false;
  quantity: number = 1;


constructor(private router:Router,private snackBar:MatSnackBar,private bookservice:BookService,private route:ActivatedRoute,private sharedservice:SharedService,private cartservice:CartService){}

  
  ngOnInit(): void {
    this.getBookDetails();
  }

  getBookDetails(){
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.bookservice.getBookById(id).subscribe({
    next: (response: any) => {
      this.book = {
        ...response,
        bookImage: `images/book${(id % 9) + 1}.png`  // optional: if you want to assign an image
      };
    },
    error: (err) => {
      console.error("Error fetching book by ID:", err);
    }
  });
}





addToBag() {
  this.isAddedToBag = true;
  this.quantity = 1;
  

  
  this.cartservice.addToCart(this.book.id).subscribe({
    next: (res) => {
      this.snackBar.open("Book added to cart!", '', { duration: 2000 });
      this.sharedservice.updateCartCountFromBackend()// updates the badge
    },
    error: (err) => {
      console.error("Error adding to cart:", err);
      this.snackBar.open("Failed to add to cart", '', { duration: 2000 });
    }
  });
}


increaseQuantity() {
  this.quantity++;
 
}

decreaseQuantity() {
  if (this.quantity > 1) {
    this.quantity--;
  }
  }

}
