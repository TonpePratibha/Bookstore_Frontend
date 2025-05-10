import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../Services/Book/book.service';
import { SharedService } from '../../Services/Shared/shared.service';
import { CartService } from '../../Services/Cart/cart.service';
import { WishlistService } from '../../Services/Wishlist/wishlist.service';

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


constructor(private router:Router,private snackBar:MatSnackBar,private bookservice:BookService,private route:ActivatedRoute,private sharedservice:SharedService,
  private cartservice:CartService,private wishlistservice:WishlistService){}

  
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


addTowishlist() {
  
  this.wishlistservice.addToWishlist(this.book.id).subscribe({
    next: (res) => {
      this.snackBar.open("Book added to wishlist!", '', { duration: 2000 });
       this.router.navigate(['/dashboard/wishlist']);
       console.log("added to wishlist")
    },
    error: (err) => {
      console.error("Error adding to wishlist:", err);
      this.snackBar.open("Failed to add to wishlist", '', { duration: 2000 });
    }
  });
}





increaseQuantity(item: any) {
  this.quantity++;
  this.cartservice.updateCart(item.id, this.quantity).subscribe(
    (response) => {
      console.log('Quantity increased:', response);
    },
    (error) => {
      console.error('Error increasing quantity:', error);
    }
  );
}

decreaseQuantity(item: any) {
  if (this.quantity > 1) {
    this.quantity--; 
    this.cartservice.updateCart(item.id, this.quantity).subscribe(
      (response) => {
        console.log('Quantity decreased:', response);
      },
      (error) => {
        console.error('Error decreasing quantity:', error);
      }
    );
  } else {
    this.snackBar.open("Minimum quantity is 1", '', { duration: 2000 });
  }
}


  selectedImage: string = '';

  setMainImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }
  
//feedback part static
  //rating = 0;
reviewText = '';
feedbackList = [
  { name: 'Aniket Chile', rating: 4, comment: 'Good product. Even though the translation could have been better...' },
  { name: 'Shweta Bodkar', rating: 4, comment: 'Chanakya’s neat and succinct writings are thought-provoking.' }
];

setRating(star: number): void {
  this.rating = star;
}

submitReview(): void {
  if (this.reviewText && this.rating) {
    this.feedbackList.unshift({
      name: 'pratibha', 
      rating: this.rating,
      comment: this.reviewText
    });
    this.reviewText = '';
    this.rating = 0;
  }
}

}
