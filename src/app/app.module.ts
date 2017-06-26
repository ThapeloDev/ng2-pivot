import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PivotModule } from "app/pivot-chart/pivot.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PivotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
