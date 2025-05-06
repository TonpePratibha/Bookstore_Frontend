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

constructor(private orderService:OrderService){}


ngOnInit(): void {
  this.getOrders();
}
// orders = [
//   {
//     bookName: 'Don\'t Make Me Think',
//     author: 'Steve Krug',
//     price: 1500,
//     originalPrice: 2000,
//     placedDate: 'May 21',
//     bookImage: 'assets/books/dont-make-me-think.jpg'
//   },
//   {
//     bookName: 'React Material-UI',
//     author: 'Cookbook',
//     price: 780,
//     originalPrice: 1400,
//     placedDate: 'April 06',
//     bookImage: 'assets/books/react-material-ui.jpg'
//   }
// ];

  getOrders() {
    this.orderService.getOrder().subscribe({
      next: (response: any) => {
        this.ordersArray = response.data.reverse().map((book:any, index:number) => ({
          ...book,
          bookImage: `images/book${(index % 9) + 1}.png`
        }));
        console.log(response.data);
        
      },
      error: (error) => {
        console.error("Error fetching books:", error);
      }
    });
  }





}
