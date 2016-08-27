import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from "@angular/forms";

import { AppComponent }   from './app.component';
import {Ng2StickyModule} from "ng2-sticky";

@NgModule({
  imports: [BrowserModule, FormsModule, Ng2StickyModule],
  declarations: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }