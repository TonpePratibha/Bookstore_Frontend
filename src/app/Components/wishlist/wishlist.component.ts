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
// filteredBooks:any[]=[];
//searchQuery:string='';
// totalBooks:any;
  constructor(private wishlistservice:WishlistService,private sharedservice:SharedService){}

 ngOnInit(): void {
   this.getWishlistItems();
  //  this.sharedservice.searchQuery$.subscribe(query => {
  //   this.searchQuery = query;
  //   this.filterBooks();
  // });

 }
 
//  filterBooks() {
//   const filteredBooks = this.wishlistArray.filter(book =>
//     book.bookName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//     book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
//   );
//   this.totalBooks = this.filteredBooks.length;
//   // this.setPagedBooks(filteredBooks);

// }
  getWishlistItems() {
    this.wishlistservice.getWishList().subscribe({
      next: (response: any) => {
        this.wishlistArray = response.data.items.reverse().map((book:any, index:number) => ({
          ...book,
          bookImage: `images/book${(index % 9) + 1}.png`
        }));
        console.log(response.data.items);
        // this.filteredBooks = [...this.wishlistArray];
        // this.totalBooks = this.filteredBooks.length;
        
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



