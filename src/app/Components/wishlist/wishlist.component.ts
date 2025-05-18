import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../Services/Wishlist/wishlist.service';
import { SharedService } from '../../Services/Shared/shared.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
wishlistArray:any[]=[];
 isLoading = true;

 pagedBooks: any[] = [];
  searchQuery:any='';

  // Pagination properties
  pageSize = 5;
  currentPage = 0;
  totalBooks = 0;
constructor(private wishlistservice:WishlistService,private sharedservice:SharedService){}

 ngOnInit(): void {
   this.getWishlistItems();

 this.sharedservice.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.filterBooks();
      
    
    });
 }


 
  filterBooks() {
    const filteredBooks = this.wishlistArray.filter(book =>
      book.bookName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalBooks = filteredBooks.length;
    this.setPagedBooks(filteredBooks);
  }

 


  getWishlistItems() {
  this.isLoading = true;

  this.wishlistservice.getWishList().subscribe({
    next: (response: any) => {
      this.wishlistArray = response.data.items.reverse();
      console.log(response.data.items);
      this.setPagedBooks();
      this.isLoading = false;
    },
    error: (error) => {
      console.error("Error fetching wishlist items:", error);

      // Handle empty wishlist (404 error)
      if (error.status === 404) {
        this.wishlistArray = [];
        this.setPagedBooks(); // still reset pagination for empty array
      }

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
  

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.setPagedBooks();
    
  
  }

  
  maxPage = 0;

setPagedBooks(filteredBooks: any[] = this.wishlistArray) {
  const start = this.currentPage * this.pageSize;
  const end = start + this.pageSize;
  this.pagedBooks = filteredBooks.slice(start, end);

  this.totalBooks = filteredBooks.length;
  this.maxPage = Math.ceil(this.totalBooks / this.pageSize);
}

goToPage(pageIndex: number) {
  this.currentPage = pageIndex;
  this.setPagedBooks();
 
}

goToPreviousPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.setPagedBooks();
   
  }
}

goToNextPage() {
  if (this.currentPage < this.maxPage - 1) {
    this.currentPage++;
    this.setPagedBooks();
   
  }
}

getPageNumbers(): number[] {
  return Array(this.maxPage).fill(0).map((_, i) => i);
}


  }



