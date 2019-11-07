import { Component, OnInit } from "@angular/core";
import { Cart, Category } from "src/app/models/cart";
import { count } from "rxjs/operators";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  cart: Cart;
  isCartVisible: boolean = false;
  totalPrice: number = 0;
  data = {
    restaurantId: "12345",
    supplierName: "Zomato",
    restaurantName: "Domino's Pizza",
    locality: "Viman Nagar, Pune",
    menu: [
      { name: "name1", price: 100 },
      { name: "name2", price: 200 },
      { name: "name3", price: 100 },
      { name: "name4", price: 200 },
      { name: "name5", price: 100 },
      { name: "name6", price: 200 },
      { name: "name7", price: 100 },
      { name: "name8", price: 200 },
      { name: "name9", price: 100 },
      { name: "Pav Bhaji", price: 200 }
    ],
    categories: [
      {
        categoryName: "Appetizers",
        items: [
          {
            name: "Pani Puri",
            price: 40
          },
          {
            name: "Masala Papad",
            price: 30
          },
          {
            name: "Veg Crispy",
            price: 120
          }
        ]
      },
      {
        categoryName: "Deserts",
        items: [
          {
            name: "Icecream",
            price: 50
          },
          {
            name: "Cake",
            price: 100
          }
        ]
      }
    ]
  };

  constructor() {}
  ngOnInit() {
    this.cart = new Cart();
    this.cart.AddToCart(this.data.categories);
  }

  decrementCount(category: number, item: number) {
    this.cart.DecrementCount(category, item);
    this.UpdateTotalCost();
  }

  incrementCount(category: number, item: number) {
    this.cart.IncrementCount(category, item);
    this.UpdateTotalCost();
  }

  UpdateTotalCost() {
    this.totalPrice = 0;
    for (let category = 0; category < this.cart.menu.length; category++) {
      for (
        let item = 0;
        item < this.cart.menu[category].menuItem.length;
        item++
      ) {
        this.totalPrice +=
          this.cart.menu[category].menuItem[item].quantity *
          this.cart.menu[category].menuItem[item].price;
      }
    }
  }

  SeeCart() {
    this.isCartVisible = true;
  }

  BacktoMenu() {
    this.isCartVisible = false;
  }

  ProceedToPay() {
    let response = {
      restaurantId: this.data.restaurantId,
      restaurantName: this.data.restaurantName,
      cart: this.cart
    };
  }
}
