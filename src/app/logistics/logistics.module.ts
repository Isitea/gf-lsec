import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { LogisticsComponent } from './logistics.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule
  ],
  declarations: [LogisticsComponent]
})
export class LogisticsModule {
}
