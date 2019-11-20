import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-ordering-history",
  templateUrl: "./ordering-history.component.html",
  styleUrls: ["./ordering-history.component.css"]
})
export class OrderingHistoryComponent implements OnInit {
  @Input() data: string;
  data2 = [
    {
      orderId: 106,
      date: "11/20/2019",
      time: "7:51:36",
      restaurantName: "Hotel Al Zaika",
      menuItems: [
        {
          name: "1/2 Chicken",
          quantity: 1,
          price: 385.0
        },
        {
          name: "1/4 Chicken",
          quantity: 2,
          price: 385.0
        },
        {
          name: "3 Chicken Wings",
          quantity: 1,
          price: 250.0
        },
        {
          name: "5 Chicken Wings",
          quantity: 1,
          price: 385.0
        },
        {
          name: "Chicken Livers and Portuguese Roll",
          quantity: 2,
          price: 250.0
        },
        {
          name: "Spicy Mixed Olives (V)",
          quantity: 1,
          price: 250.0
        }
      ],
      totalPoints: 2540
    },
    {
      orderId: 106,
      date: "11/20/2019",
      time: "7:51:36",
      restaurantName: "Hotel Al Zaika",
      menuItems: [
        {
          name: "1/2 Chicken",
          quantity: 1,
          price: 385.0
        },
        {
          name: "1/4 Chicken",
          quantity: 2,
          price: 385.0
        },
        {
          name: "3 Chicken Wings",
          quantity: 1,
          price: 250.0
        },
        {
          name: "5 Chicken Wings",
          quantity: 1,
          price: 385.0
        },
        {
          name: "Chicken Livers and Portuguese Roll",
          quantity: 2,
          price: 250.0
        },
        {
          name: "Spicy Mixed Olives (V)",
          quantity: 1,
          price: 250.0
        }
      ],
      totalPoints: 2540
    },
    {
      orderId: 106,
      date: "11/20/2019",
      time: "7:51:36",
      restaurantName: "Hotel Al Zaika",
      menuItems: [
        {
          name: "1/2 Chicken",
          quantity: 1,
          price: 385.0
        },
        {
          name: "1/4 Chicken",
          quantity: 2,
          price: 385.0
        },
        {
          name: "3 Chicken Wings",
          quantity: 1,
          price: 250.0
        },
        {
          name: "5 Chicken Wings",
          quantity: 1,
          price: 385.0
        },
        {
          name: "Chicken Livers and Portuguese Roll",
          quantity: 2,
          price: 250.0
        },
        {
          name: "Spicy Mixed Olives (V)",
          quantity: 1,
          price: 250.0
        }
      ],
      totalPoints: 2540
    }
  ];

  constructor() {}

  ngOnInit() {}
}
