import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardComponent } from "./card.component";
import { MatCarouselModule } from "@ngmodule/material-carousel";
import { CarouselModule, WavesModule } from "angular-bootstrap-md";

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, CarouselModule.forRoot(), WavesModule.forRoot()],
  exports: [CardComponent, CommonModule]
})
export class CardModule {}
