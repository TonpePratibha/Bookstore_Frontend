

import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from '../../Services/Book/book.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SharedService } from '../../Services/Shared/shared.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  
  searchQuery: string = ''; // Property to store search query
  cartCount=0;
  

  constructor(private router: Router, private snackBar: MatSnackBar, private books: BookService,private sharedservice:SharedService) {}

  showLogoutText = false;

  ngOnInit(): void {
    this.sharedservice.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    this.sharedservice.updateCartCountFromBackend();
  
  }

//to search books event sent from dashboard to booksdata (emited here) through shared service
  searchBooks() {
    this.sharedservice.setSearchQuery(this.searchQuery);
  }


  

  toggleLogoutText() {
    this.showLogoutText = !this.showLogoutText;
  }

  OnLogout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/registerlogin');
    this.snackBar.open("Logout Successful", '', { duration: 3000 });
  }
 

  isLoggedIn = false; // Set this based on your login state

login() {
  this.router.navigate(['/login']);
}

logout() {
  // Clear tokens/session
  this.isLoggedIn = false;
  this.router.navigate(['/registerlogin']);
}

goToOrders() {
  this.router.navigate(['/dashboard/order']);
}

goToWishlist() {
  this.router.navigate(['/dashboard/wishlist']);
}

  
  
}
