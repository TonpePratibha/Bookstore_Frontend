import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../Services/Wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
wishlistArray:any[]=[];
  constructor(private wishlistservice:WishlistService){}

 ngOnInit(): void {
   this.getWishlistItems();
 }

  getWishlistItems() {
    this.wishlistservice.getWishList().subscribe({
      next: (response: any) => {
        this.wishlistArray = response.data.items.reverse().map((book:any, index:number) => ({
          ...book,
          bookImage: `images/book${(index % 9) + 1}.png`
        }));
        console.log(response.data.items);
        
      },
      error: (error) => {
        console.error("Error fetching books:", error);
      }
    });
  }

  removeFromWishlist(bookId: number) {
    this.wishlistservice.removeFromWishlist(bookId).subscribe({
      next: (response: any) => {
        
        this.wishlistArray = this.wishlistArray.filter(book => book.id !== bookId);
  
       
  
        console.log("Updated wishlist:", this.wishlistArray);
      },
      error: (error) => {
        console.error("Error removing book from wishlist:", error);
      }
    });
  }
  


  }



