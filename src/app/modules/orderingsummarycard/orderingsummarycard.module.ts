import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderingsummarycardComponent } from './orderingsummarycard.component';


@NgModule({
  declarations: [OrderingsummarycardComponent],
  imports: [
    CommonModule
  ],
  exports:[OrderingsummarycardComponent, CommonModule]
})
export class OrderingsummarycardModule { }
