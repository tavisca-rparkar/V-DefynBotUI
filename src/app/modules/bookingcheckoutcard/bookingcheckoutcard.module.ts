import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BookingCheckoutcardComponent } from "./bookingcheckoutcard.component";

@NgModule({
  declarations: [BookingCheckoutcardComponent],
  imports: [CommonModule],
  exports: [BookingCheckoutcardComponent, CommonModule]
})
export class BookingCheckoutcardModule {}
