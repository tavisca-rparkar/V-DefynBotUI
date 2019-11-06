import { Component, OnInit } from "@angular/core";
import { Cart } from "src/app/models/cart";

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
      { name: "Bhature Chole", price: 100 },
      { name: "name2", price: 200 },
      { name: "name3", price: 100 },
      { name: "name4", price: 200 },
      { name: "name5", price: 100 },
      { name: "name6", price: 200 },
      { name: "name7", price: 100 },
      { name: "name8", price: 200 },
      { name: "name9", price: 100 },
      { name: "Pav Bhaji", price: 200 }
    ]
  };

  constructor() {}
  ngOnInit() {
    this.cart = new Cart();
    this.cart.AddToCart(this.data.menu);
  }

  decrementCount(index: number) {
    this.cart.DecrementCount(index);
    this.UpdateTotalCost();
  }

  incrementCount(index: number) {
    this.cart.IncrementCount(index);
    this.UpdateTotalCost();
  }

  UpdateTotalCost() {
    this.totalPrice = 0;
    for (let i = 0; i < this.cart.item.length; i++) {
      this.totalPrice += this.cart.qty[i] * this.cart.price[i];
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
