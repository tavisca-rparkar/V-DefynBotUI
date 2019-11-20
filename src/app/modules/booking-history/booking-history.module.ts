import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserHistoryComponent } from "./booking-history.component";

@NgModule({
  declarations: [UserHistoryComponent],
  imports: [CommonModule],
  exports: [UserHistoryComponent, CommonModule]
})
export class UserHistoryModule {}
