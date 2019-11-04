import {
  Component,
  AfterViewInit,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  ChangeDetectorRef
} from "@angular/core";
import { TextBubbleComponent } from "./text-bubble/text-bubble.component";
import { ChoiceButtonComponent } from "./choice-button/choice-button.component";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { AppService } from "src/app/services/app.service";
import { CarouselComponent } from "src/app/modules/carousel/carousel.component";
import { CardComponent } from "src/app/modules/card/card.component";
import { LocationButtonComponent } from "../../location-button/location-button.component";
import { BookingCheckoutcardComponent } from "src/app/modules/bookingcheckoutcard/bookingcheckoutcard.component";
import { BookingsummarycardComponent } from "src/app/modules/bookingsummarycard/bookingsummarycard.component";

@Component({
  selector: "app-chat-body",
  templateUrl: "./chat-body.component.html",
  styleUrls: ["./chat-body.component.css"]
})
export class ChatBodyComponent implements OnInit, AfterViewInit {
  @ViewChild("chatContainer", { read: ViewContainerRef, static: false })
  vc: ViewContainerRef;

  constructor(
    private _appService: AppService,
    private _factory: ComponentFactoryResolver,
    private _componentFactoryService: ComponentFactoryService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._componentFactoryService.createTextBubble$.subscribe(data => {
      this.addTextBubble(data);
    });
    this._componentFactoryService.createChoiceButton$.subscribe(data => {
      this.addChoiceButton(data);
    });
    this._componentFactoryService.createRestaurantCarousel$.subscribe(data => {
      this.addRestaurantCarousel(data);
    });
    this._componentFactoryService.createRestaurantDetailsCard$.subscribe(
      data => {
        this.addRestaurantDetailsCard(data);
      }
    );
    this._componentFactoryService.locationButton$.subscribe(data => {
      this.addLocationButton();
    });
    this._componentFactoryService.restaurantCheckoutCard$.subscribe(data => {
      this.addRestaurantCheckoutCard(data);
    });
    this._componentFactoryService.bookingSummaryCard$.subscribe(data => {
      this.addBookingSummaryCard(data);
    });
  }

  ngAfterViewInit() {
    // initiating conversation for default welcome message-

    this._appService.InitiateConversation();
  }

  addLocationButton() {
    const factory = this._factory.resolveComponentFactory(
      LocationButtonComponent
    );
    const componentRef1 = this.vc.createComponent(factory);
    let instance = <LocationButtonComponent>componentRef1.instance;
  }
  addTextBubble(data) {
    const factory = this._factory.resolveComponentFactory(TextBubbleComponent);
    const componentRef = this.vc.createComponent(factory);
    let instance = <TextBubbleComponent>componentRef.instance;
    instance.text = data.userText;
    instance.textType = data.textType;
  }

  addChoiceButton(buttonText: string[]) {
    const factory = this._factory.resolveComponentFactory(
      ChoiceButtonComponent
    );
    const componentRef1 = this.vc.createComponent(factory);
    let instance1 = <ChoiceButtonComponent>componentRef1.instance;
    instance1.buttonText = buttonText[0];
    const componentRef2 = this.vc.createComponent(factory);
    let instance2 = <ChoiceButtonComponent>componentRef2.instance;
    instance2.buttonText = buttonText[1];
  }

  addRestaurantCarousel(data) {
    const factory = this._factory.resolveComponentFactory(CarouselComponent);
    const componentRef1 = this.vc.createComponent(factory);
    let instance = <CarouselComponent>componentRef1.instance;
    instance.data = data;
    this.cdRef.detectChanges();
  }

  addRestaurantDetailsCard(data) {
    const factory = this._factory.resolveComponentFactory(CardComponent);
    const componentRef1 = this.vc.createComponent(factory);
    let instance = <CardComponent>componentRef1.instance;
    instance.data = data;
    this.cdRef.detectChanges();
  }

  addRestaurantCheckoutCard(data) {
    const factory = this._factory.resolveComponentFactory(
      BookingCheckoutcardComponent
    );
    const componentRef1 = this.vc.createComponent(factory);
    let instance = <BookingCheckoutcardComponent>componentRef1.instance;
    instance.data = data;
    this.cdRef.detectChanges();
  }

  addBookingSummaryCard(data) {
    const factory = this._factory.resolveComponentFactory(
      BookingsummarycardComponent
    );
    const componentRef1 = this.vc.createComponent(factory);
    let instance = <BookingsummarycardComponent>componentRef1.instance;
    instance.data = data;
    this.cdRef.detectChanges();
  }
}
