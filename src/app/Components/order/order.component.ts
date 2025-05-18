import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/Order/order.service';
import { PageEvent } from '@angular/material/paginator';
import { SharedService } from '../../Services/Shared/shared.service';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
 ordersArray :any[]=[];
isLoading = true;
 pagedBooks: any[] = [];
  searchQuery:any='';

  // Pagination properties
  pageSize = 5;
  currentPage = 0;
  totalBooks = 0;

constructor(private orderService:OrderService,private sharedservice:SharedService){}


ngOnInit(): void {
  this.getOrders();
   this.sharedservice.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.filterBooks();
      
    
    });
}



  filterBooks() {
    const filteredBooks = this.ordersArray.filter(book =>
      book.bookName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase())|| 
      (book.orderdate && book.orderdate.toLowerCase().includes(this.searchQuery.toLowerCase())) 
    );
    this.totalBooks = filteredBooks.length;
    this.setPagedBooks(filteredBooks);
  }


getOrders() {
  this.orderService.getOrder().subscribe({
    next: (response: any) => {
      this.ordersArray = response.data
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
       
      this.isLoading = false;
      console.log(this.ordersArray);
      this.setPagedBooks();
    },
    error: (error) => {
      console.error("Error fetching books:", error);
      this.isLoading=false;
    }
  });
}




  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.setPagedBooks();
   
  
  }

  
  maxPage = 0;

setPagedBooks(filteredBooks: any[] = this.ordersArray) {
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
