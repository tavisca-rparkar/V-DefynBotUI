import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BookingsummarycardComponent } from "./bookingsummarycard.component";

@NgModule({
  declarations: [BookingsummarycardComponent],
  imports: [CommonModule],
  exports: [BookingsummarycardComponent, CommonModule]
})
export class BookingsummarycardModule {}
