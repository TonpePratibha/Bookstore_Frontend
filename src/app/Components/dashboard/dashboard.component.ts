

import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from '../../Services/Book/book.service';

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
  firstname:string='';

  constructor(private router: Router, private snackBar: MatSnackBar, private books: BookService,private sharedservice:SharedService) {}

  showLogoutText = false;

  ngOnInit(): void {
    this.sharedservice.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    this.sharedservice.updateCartCountFromBackend();
    this.firstname=this.sharedservice.getFirstName();
  
  }

//to search books event sent from dashboard to booksdata (emited here) through shared service
  searchBooks() {
    this.sharedservice.setSearchQuery(this.searchQuery);
  }



  showProfileCard = false;

toggleProfileCard() {
  this.showProfileCard = !this.showProfileCard;
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



goToOrders() {
  this.router.navigate(['/dashboard/order']);
}

goToWishlist() {
  this.router.navigate(['/dashboard/wishlist']);
}

  
  
}
