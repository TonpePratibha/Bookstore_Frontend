import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from '../../Services/Book/book.service';
import { PageEvent } from '@angular/material/paginator';
import { SharedService } from '../../Services/Shared/shared.service';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { response } from 'express';
@Component({
  selector: 'app-booksdata',
  standalone: false,
  templateUrl: './booksdata.component.html',
  styleUrl: './booksdata.component.scss'
})
export class BooksdataComponent implements OnInit {
  sortOption = 'relevance';
  booksArray: any[] = [];
  pagedBooks: any[] = [];
  searchQuery:any='';
 isLoading = false;


  // Pagination properties
  pageSize = 8;
  currentPage = 0;
  totalBooks = 0;

  constructor(private router: Router, private snackBar: MatSnackBar, private books: BookService,
    private sharedservice:SharedService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllBooks();

    this.sharedservice.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.filterBooks();
      
    
    });
  }
  
  filterBooks() {
    const filteredBooks = this.booksArray.filter(book =>
      book.bookName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalBooks = filteredBooks.length;
    this.setPagedBooks(filteredBooks);
  }

sortBooks() {
  
  switch (this.sortOption) {
    case 'priceLowHigh':
      this.books.sortBooksAsc().subscribe({
        next: (response: any) => this.setSortedBooks(response),
        error: (err) => console.error("Sort Low to High error:", err)
      });
      break;

    case 'priceHighLow':
      this.books.sortBooksDesc().subscribe({
        next: (response: any) => this.setSortedBooks(response),
        error: (err) => console.error("Sort High to Low error:", err)
        
      });
      break;

    case 'newest':
      this.books.getRecentBooks().subscribe({
        next: (response: any) => this.setSortedBooks(response),
        error: (err) => console.error("Sort Newest First error:", err)
      });
      break;

    default:
      //relevance
      this.getAllBooks(false);
      break;
  }
}

setSortedBooks(data: any[]) {
  this.booksArray = data.map((book: any, index: number) => ({
    ...book,
    // bookImage: `images/book${(index % 9) + 1}.png`
  }));
  this.currentPage = 0;
  this.totalBooks = this.booksArray.length;
  this.setPagedBooks();

}



  goToDetails(id: number) {
    this.router.navigate(['/dashboard/bookdetails', id]);
  }
  
  
 


  getAllBooks(applySort = true) {  //getting multile calls for relevence thats why appiled flag here
   this.isLoading = true;
    this.books.getBooks().subscribe({ 
    next: (response: any) => {
      this.booksArray = response;
      this.totalBooks = this.booksArray.length;
      
      if (applySort) {
        this.sortBooks();  // Only sort if flag is true
      } else {
        this.setPagedBooks();
         this.isLoading = false;
      
      }
    },
    error: (error) => {
      console.error("Error fetching books:", error);
      this.isLoading = false;
    }
  });
}


 
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.setPagedBooks();
    
  
  }

  
  maxPage = 0;

setPagedBooks(filteredBooks: any[] = this.booksArray) {
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
