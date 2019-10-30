import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardComponent } from "./card.component";
import { CarouselModule } from "ngx-bootstrap";

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, CarouselModule.forRoot()],
  exports: [CardComponent, CommonModule]
})
export class CardModule {}
