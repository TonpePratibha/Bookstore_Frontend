

import { Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
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
  
  searchQuery: string = ''; 
  cartCount=0;
  firstname:string='';
  showProfileCard = false;
 @ViewChild('profileWrapper') profileWrapper!: ElementRef;
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




toggleProfileCard() {
  this.showProfileCard = !this.showProfileCard;
}

 
  OnLogout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/registerlogin');
    this.snackBar.open("Logout Successful", '', { duration: 3000 });
     this.showProfileCard = false;
  }
 

 


goToOrders() {
  this.router.navigate(['/dashboard/order']);
   this.showProfileCard = false;
}

goToWishlist() {
  this.router.navigate(['/dashboard/wishlist']);
   this.showProfileCard = false;
}

   @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.profileWrapper && !this.profileWrapper.nativeElement.contains(event.target)) {
      this.showProfileCard = false;
    }
  }
  
}
