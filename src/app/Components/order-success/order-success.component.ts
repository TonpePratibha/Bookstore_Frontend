import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: false,
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss'
})
export class OrderSuccessComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/dashboard/home']); 
  }
}
