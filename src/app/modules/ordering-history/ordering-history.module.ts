import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderingHistoryComponent } from "./ordering-history.component";

@NgModule({
  declarations: [OrderingHistoryComponent],
  imports: [CommonModule],
  exports: [OrderingHistoryComponent, CommonModule]
})
export class OrderingHistoryModule {}
