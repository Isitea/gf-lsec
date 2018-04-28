import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Router Module import
import { Routes, RouterModule } from "@angular/router";

// Module import
import { LogisticsModule } from '../logistics/logistics.module';

// Component import
import { LogisticsComponent } from '../logistics/logistics.component';

const routers: Routes = [
  { path: '', component: LogisticsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot( routers ),
    LogisticsModule
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRouterModule { }
