import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../Services/Wishlist/wishlist.service';
import { SharedService } from '../../Services/Shared/shared.service';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
wishlistArray:any[]=[];
 isLoading = true;
constructor(private wishlistservice:WishlistService,private sharedservice:SharedService){}

 ngOnInit(): void {
   this.getWishlistItems();


 }

  getWishlistItems() {
   
    this.wishlistservice.getWishList().subscribe({
      next: (response: any) => {
        this.wishlistArray = response.data.items.reverse().map((book:any, index:number) => ({
          ...book,
          //bookImage: `images/book${(index % 9) + 1}.png`
        }));
        console.log(response.data.items);
        // this.filteredBooks = [...this.wishlistArray];
        // this.totalBooks = this.filteredBooks.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error fetching books:", error);
        this.isLoading = false;
      }
    });
  }
  
trackByBookId(index: number, item: any): number {
  return item.bookId;
}
  removeFromWishlist(bookId: number) {
    this.wishlistservice.removeFromWishlist(bookId).subscribe({
      next: (response: any) => {
          this.sharedservice.triggerCartRefresh();
        this.wishlistArray = this.wishlistArray.filter(book => book.id !== bookId);    
        console.log("Updated wishlist:", this.wishlistArray);
        //window.location.reload();
      this.getWishlistItems();
      },
      error: (error) => {
        console.error("Error removing book from wishlist:", error);
      }
    });
  }
  


  }



