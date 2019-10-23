import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})

export class ComponentFactoryService {
  private _textBubbleSource = new Subject<any>();
  createTextBubble$ =this._textBubbleSource.asObservable();
  private _choiceButtonSource = new Subject<string[]>();
  createChoiceButton$ =this._choiceButtonSource.asObservable();
  private _restaurantCarouselSource = new Subject<object[]>();
  createRestaurantCarousel$ =this._restaurantCarouselSource.asObservable();
  
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
  
  updateScroll() { // called in AfterViewInit of all the chatbody components
    var element = document.getElementById("msg-page");
    element.scrollTop = element.scrollHeight;
  }
}
