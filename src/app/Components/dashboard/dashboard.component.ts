


// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { BookService } from '../../Services/Book/book.service';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { firstValueFrom } from 'rxjs';

// @Component({
//   selector: 'app-dashboard',
//   standalone: false,
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.scss'
// })
// export class DashboardComponent implements OnInit {
//   sortOption = 'relevance';
//   booksArray: any[] = [];
//   pagedBooks: any[] = [];

//   // Pagination properties
//   pageSize = 8;
//   currentPage = 0;
//   totalBooks = 0;

 

//   constructor(private router: Router, private snackBar: MatSnackBar, private books: BookService) {}

//   showLogoutText = false;

//   ngOnInit(): void {
//     this.getAllBooks(); 
//   }

//   toggleLogoutText() {
//     this.showLogoutText = !this.showLogoutText;
//   }

//   OnLogout() {
//     localStorage.removeItem("token");
//     this.router.navigateByUrl('/loginregister');
//     this.snackBar.open("Logout Successful", '', { duration: 3000 });
//   }

  

//   getAllBooks() {
//     this.books.getBooks().subscribe({
//       next: (response: any) => {
//         // Loop through the response and add the image URL to each book
//         this.booksArray = response.reverse().map((book:any, index:number) => ({
//           ...book,
//           // Here, you can assign images based on your naming convention or database values.
//           bookImage: `images/book${(index % 9)+ 1}.png` // Modify this as needed
//         }));
        
//         this.totalBooks = this.booksArray.length;
//         this.setPagedBooks();
//       },
//       error: (error) => {
//         console.error("Error fetching books:", error);
//       }
//     });
//   }
  
  


//   onPageChange(event: PageEvent) {
//     this.pageSize = event.pageSize;
//     this.currentPage = event.pageIndex;
//     this.setPagedBooks();
//   }

//   setPagedBooks() {
//     const start = this.currentPage * this.pageSize;
//     const end = start + this.pageSize;
//     this.pagedBooks = this.booksArray.slice(start, end);
//     console.log(`Paged Books:`, this.pagedBooks);
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from '../../Services/Book/book.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  sortOption = 'relevance';
  booksArray: any[] = [];
  pagedBooks: any[] = [];
  searchQuery: string = ''; // Property to store search query

  // Pagination properties
  pageSize = 8;
  currentPage = 0;
  totalBooks = 0;

  constructor(private router: Router, private snackBar: MatSnackBar, private books: BookService) {}

  showLogoutText = false;

  ngOnInit(): void {
    this.getAllBooks(); 
  }

  toggleLogoutText() {
    this.showLogoutText = !this.showLogoutText;
  }

  OnLogout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/registerlogin');
    this.snackBar.open("Logout Successful", '', { duration: 3000 });
  }
  sortBooks() {
    switch (this.sortOption) {
      case 'priceLowHigh':
        this.booksArray.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        this.booksArray.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        this.booksArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break; // No sorting for 'relevance' or other options
    }
    this.setPagedBooks(); // Update paged books after sorting
  }
  getAllBooks() {
    this.books.getBooks().subscribe({
      next: (response: any) => {
        this.booksArray = response.reverse().map((book:any, index:number) => ({
          ...book,
          bookImage: `images/book${(index % 9) + 1}.png`
        }));
        
        this.totalBooks = this.booksArray.length;
        this.sortBooks()
        this.setPagedBooks();
      },
      error: (error) => {
        console.error("Error fetching books:", error);
      }
    });
  }

  // Method to search books based on query
  searchBooks() {
    // Filter the books based on the search query
    const filteredBooks = this.booksArray.filter(book =>
      book.bookName.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    // Update the totalBooks and pagedBooks after filtering
    this.totalBooks = filteredBooks.length;
    this.setPagedBooks(filteredBooks);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.setPagedBooks();
  }

  setPagedBooks(filteredBooks: any[] = this.booksArray) {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedBooks = filteredBooks.slice(start, end);
    console.log(`Paged Books:`, this.pagedBooks);
  }
}
