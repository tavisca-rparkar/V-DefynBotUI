import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardComponent } from "./card.component";
import { MatCarouselModule } from "@ngmodule/material-carousel";

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, MatCarouselModule.forRoot()],
  exports: [CardComponent, CommonModule]
})
export class CardModule {}
