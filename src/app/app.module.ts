import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// BrowserAnimationsModule import
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// MatTableModule import
import { MatTableModule } from '@angular/material/table';

// Component import
import { AppComponent } from './app.component';

// Routing Module import
import { AppRouterModule } from "./router/router.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
