import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../Services/Book/book.service';
import { SharedService } from '../../Services/Shared/shared.service';
import { CartService } from '../../Services/Cart/cart.service';
import { WishlistService } from '../../Services/Wishlist/wishlist.service';
import { FeedbackService } from '../../Services/Feedback/feedback.service';

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
  firstname:string='';
  selectedImage: string = '';
  reviewText = '';
  isLoading = false;
  feedbackList: any[] = [];


constructor(private router:Router,private snackBar:MatSnackBar,private bookservice:BookService,private route:ActivatedRoute,private sharedservice:SharedService,
  private cartservice:CartService,private wishlistservice:WishlistService,private feedbackservice:FeedbackService){}

  
  ngOnInit(): void {
    this.getBookDetails();
    this.firstname=this.sharedservice.getFirstName();
     localStorage.getItem('firstname');
    console.log("name",this.firstname);
  }

  getBookDetails(){
    this.isLoading = true;
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.bookservice.getBookById(id).subscribe({
    next: (response: any) => {
      this.book = response;
      this.isLoading = false;
       this.getFeedbacks(this.book.id);
    },
    error: (err) => {
      console.error("Error fetching book by ID:", err);
      this.isLoading = false;
    }
  });
}


addToBag() {
  this.isAddedToBag = true;
  this.quantity = 1;
  

  
  this.cartservice.addToCart(this.book.id).subscribe({
    next: (res) => {
      // this.snackBar.open("Book added to cart!", '', { duration: 2000 });
        this.snackBar.open('Book added to cart!', 'Close', {
        duration: 2000,
        panelClass: 'success-snackbar'
      });
      
      this.sharedservice.updateCartCountFromBackend()// updates the badge
    },
    error: (err) => {
      console.error("Error adding to cart:", err);
      // this.snackBar.open("Failed to add to cart", '', { duration: 2000 });
       this.snackBar.open('Failed to add to cart', 'Close', {
        duration: 2000,
        panelClass: 'error-snackbar'
      });
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




  setMainImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }
  




getFeedbacks(bookId: number) {
  this.feedbackservice.getFeedback(bookId).subscribe({
    next: (res: any) => {
      this.feedbackList = res.data; // assuming API sends {; data: [...] }
      console.log(res);
    },
    error: (err) => {
      console.error('Failed to load feedbacks:', err);
    }
  });
}
submitReview(): void {
  if (!this.reviewText || !this.rating) {
    this.snackBar.open("Rating and review are required", '', { duration: 2000 });
    return;
  }

  const payload = {
    bookId: this.book.id,
    rating: this.rating,
    review: this.reviewText
  };

  this.feedbackservice.addFeedback(payload).subscribe({
    next: (res: any) => {
      this.snackBar.open('Feedback submitted!', '', { duration: 2000 });
      this.reviewText = '';
      this.rating = 0;
      this.getFeedbacks(this.book.id); // reload latest feedbacks
      console.log(res);
    },
    error: (err) => {
      const msg = err?.error?.message || 'Error submitting feedback.';
      this.snackBar.open(msg, '', { duration: 2000 });
    }
  });
}


setRating(star: number): void {
  this.rating = star;
}




}
