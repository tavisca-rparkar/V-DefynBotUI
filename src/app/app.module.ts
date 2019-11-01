import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ChangeDetectorRef } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChatbotComponent } from "./components/chatbot/chatbot.component";
import { ChatBodyComponent } from "./components/chatbot/chat-body/chat-body.component";
import { ChatInputComponent } from "./components/chatbot/chat-input/chat-input.component";
import { LauncherComponent } from "./components/launcher/launcher.component";
import { FormComponent } from "./components/launcher/form/form.component";
import { TextBubbleComponent } from "./components/chatbot/chat-body/text-bubble/text-bubble.component";
import { HttpClientModule } from "@angular/common/http";
import { ChoiceButtonComponent } from "./components/chatbot/chat-body/choice-button/choice-button.component";
import { HeaderModule } from "./modules/header/header.module";
import { CardModule } from "./modules/card/card.module";
import { CardComponent } from "./modules/card/card.component";
import { LoaderModule } from "./modules/loader/loader.module";
import { CarouselModule } from "./modules/carousel/carousel.module";
import { CarouselComponent } from "./modules/carousel/carousel.component";
import { LocationButtonComponent } from "./components/location-button/location-button.component";
import { BookingCheckoutcardModule } from "./modules/bookingcheckoutcard/bookingcheckoutcard.module";
import { BookingCheckoutcardComponent } from './modules/bookingcheckoutcard/bookingcheckoutcard.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    ChatBodyComponent,
    ChatInputComponent,
    LauncherComponent,
    FormComponent,
    TextBubbleComponent,
    ChoiceButtonComponent,
    LocationButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HeaderModule,
    CardModule,
    CarouselModule,
    LoaderModule,
    BookingCheckoutcardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    TextBubbleComponent,
    ChoiceButtonComponent,
    CarouselComponent,
    CardComponent,
    LocationButtonComponent,
    BookingCheckoutcardComponent
  ]
})
export class AppModule {}
