import { Component, OnInit, Input } from "@angular/core";
import { Cart, Category, MenuItem } from "src/app/models/cart";
import { count } from "rxjs/operators";
import { StateService } from "src/app/services/state.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  @Input() data;
  cart: Cart;
  isCartVisible: boolean = false;
  selectedCategoryIndex: number = 0;
  selectedCategoryMenu: any;
  totalPrice: number = 0;
  /*data = {
    restaurantId: "12345",
    supplierName: "Zomato",
    restaurantName: "Domino's Pizza",
    locality: "Viman Nagar, Pune",
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
          },
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
  };*/
  constructor(
    private _stateService: StateService,
    private _appService: AppService
  ) {}
  ngOnInit() {
    this.cart = new Cart();
    this.cart.AddToCart(this.data.categories);
    this.GetCategoryMenu(this.selectedCategoryIndex);
  }

  decrementCount(item: number) {
    this.cart.DecrementCount(this.selectedCategoryIndex, item);
    this.UpdateTotalCost();
  }

  incrementCount(item: number) {
    this.cart.IncrementCount(this.selectedCategoryIndex, item);
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

  GetCategoryMenu(categoryIndex: number) {
    this.selectedCategoryMenu = this.cart.menu[categoryIndex].menuItem;
    this.selectedCategoryIndex = categoryIndex;
  }

  SeeCart() {
    this.isCartVisible = true;
  }

  BacktoMenu() {
    this.isCartVisible = false;
  }

  ProceedToPay() {
    let cart = new Array<MenuItem>();
    this.cart.menu.forEach(category => {
      category.menuItem.forEach(item => {
        if (item.quantity > 0) {
          cart.push(item);
        }
      });
    });
    let orderingPaymentData = {
      restaurantId: this.data.restaurantId,
      restaurantName: this.data.restaurantName,
      userId: this._stateService.userID,
      totalPoints: this.totalPrice,
      menuItems: cart
    };
    this._appService.IntentRouter(
      "Process Ordering Payment",
      orderingPaymentData
    );
  }
}
