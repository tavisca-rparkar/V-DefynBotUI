import { Component, OnInit, Input } from "@angular/core";
import { Cart, Category, MenuItem } from "src/app/models/cart";
import { count } from "rxjs/operators";
import { StateService } from "src/app/services/state.service";
import { AppService } from "src/app/services/app.service";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { OrderingPaymentData } from "src/app/models/OrderingPaymentData";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  @Input() data;
  cart: Cart;
  isCartVisible: boolean = false;
  isProceedToPayClicked: boolean = false;
  selectedCategoryIndex: number = 0;
  selectedCategoryMenu: any;
  totalPrice: number = 0;
  pointsPrice: number = 0;
  restaurantData: any;

  isErrorDetected: boolean = false;
  isCancelled: boolean = false;
  insufficientBalanceError =
    "Can't add items to cart due to insufficient point balance.";
  cancelMessage = "Order Cancelled";
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
    private _appService: AppService,
    private _componentFactoryService: ComponentFactoryService
  ) {}
  ngOnInit() {
    this.cart = new Cart();

    this.cart.AddToCart(this.data);
    this.GetCategoryMenu(this.selectedCategoryIndex);
    this.restaurantData = this._stateService._foodOrderRestauranData;
  }

  ngAfterViewInit() {
    this._componentFactoryService.updateScroll();
  }

  incrementCount(item: number) {
    this.cart.IncrementCount(this.selectedCategoryIndex, item);
    this.UpdateTotalCost();
    if (this.pointsPrice > this._stateService.appData.pointBalance) {
      this.isErrorDetected = true;
      this.decrementCount(item);
      setTimeout(() => {
        this._componentFactoryService.updateScroll();
      }, 50);
      setTimeout(() => {
        this.isErrorDetected = false;
        this._componentFactoryService.updateScroll();
      }, 3000);
    }
  }

  decrementCount(item: number) {
    this.cart.DecrementCount(this.selectedCategoryIndex, item);
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
    this.pointsPrice = this.totalPrice;
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

  CancelOrder() {
    if (confirm("Are you sure you want to cancel the order?")) {
      this.isProceedToPayClicked = true;
      this.isCancelled = true;
      this._appService.IntentRouter("Cancel Order", null);
    }
  }

  ProceedToPay() {
    let date = new Date();
    let dateStr = date.getFullYear() +"-";
    dateStr += (date.getMonth() + 1) > 9 ?(date.getMonth() + 1) : "0" + (date.getMonth() + 1);
    dateStr += "-";
    dateStr += date.getDate() >9 ?date.getDate(): "0" + date.getDate();
    dateStr +=   "T" ;
    dateStr += date.getHours()>9 ? date.getHours(): "0" + date.getHours();
    dateStr += ":";
    dateStr += date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

    let cart = new Array<MenuItem>();
    this.cart.menu.forEach(category => {
      category.menuItem.forEach(item => {
        if (item.quantity > 0) {
          cart.push(item);
        }
      });
    });
    let orderingPaymentData: OrderingPaymentData = new OrderingPaymentData(
      this.restaurantData["supplierName"] +
        "/" +
        this.restaurantData["restaurantId"],
      this.restaurantData["restaurantName"],
      this._stateService.appData.userId,
      this.pointsPrice,
      dateStr,
      cart
    );

    this.isProceedToPayClicked = true;
    this._appService.IntentRouter(
      "Process Ordering Payment",
      orderingPaymentData
    );
  }
}
