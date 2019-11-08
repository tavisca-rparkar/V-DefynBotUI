import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ComponentFactoryService {
  private _textBubbleSource = new Subject<any>();
  createTextBubble$ = this._textBubbleSource.asObservable();
  private _choiceButtonSource = new Subject<string[]>();
  createChoiceButton$ = this._choiceButtonSource.asObservable();
  private _restaurantCarouselSource = new Subject<object[]>();
  createRestaurantCarousel$ = this._restaurantCarouselSource.asObservable();
  private _restaurantDetailsCard = new Subject<object[]>();
  createRestaurantDetailsCard$ = this._restaurantDetailsCard.asObservable();
  private _loader = new Subject<boolean>();
  isLoaderShown$ = this._loader.asObservable();
  private _loationButton = new Subject<boolean>();
  locationButton$ = this._loationButton.asObservable();
  private _restaurantCheckoutCard = new Subject<boolean>();
  restaurantCheckoutCard$ = this._restaurantCheckoutCard.asObservable();
  private _bookingSummaryCard = new Subject<boolean>();
  bookingSummaryCard$ = this._bookingSummaryCard.asObservable();
  private _orderingMenuCard = new Subject<object[]>();
  createOrderingMenuCard$ = this._orderingMenuCard.asObservable();

  constructor() {}

  AddTextBubble(userText: string, textType: string) {
    let data = { userText: userText, textType: textType };
    this._textBubbleSource.next(data);
  }

  AddChoiceButton(buttonText: string[]) {
    this._choiceButtonSource.next(buttonText);
  }

  AddRestaurantCarousel(data) {
    this._restaurantCarouselSource.next(data);
  }

  AddRestaurantDetailsCard(data) {
    this._restaurantDetailsCard.next(data);
  }

  AddRestaurantCheckoutCard(data) {
    this._restaurantCheckoutCard.next(data);
  }

  AddBookingSummaryCard(data) {
    this._bookingSummaryCard.next(data);
  }

  AddOrderingMenuCard(data) {
    this._orderingMenuCard.next(data);
  }

  updateScroll() {
    // called in AfterViewInit of all the chatbody components
    var element = document.getElementById("msg-page");
    element.scrollTop = element.scrollHeight;
  }

  StartLoader() {
    this._loader.next(true);
  }
  StopLoader() {
    this._loader.next(false);
  }
  addLocationButton() {
    this._loationButton.next();
  }
}
