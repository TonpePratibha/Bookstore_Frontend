import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/Order/order.service';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
 ordersArray :any[]=[];
isLoading = true;
constructor(private orderService:OrderService){}


ngOnInit(): void {
  this.getOrders();
}




getOrders() {
  this.orderService.getOrder().subscribe({
    next: (response: any) => {
      this.ordersArray = response.data
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
        // .map((book: any, index: number) => ({
        //   ...book,
        //   //bookImage: `images/book${(index % 9) + 1}.png`
        // }));
      this.isLoading = false;
      console.log(this.ordersArray);
    },
    error: (error) => {
      console.error("Error fetching books:", error);
      this.isLoading=false;
    }
  });
}



}
