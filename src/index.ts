import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule  } from '@angular/platform-browser';

import {Ng2StickyDirective} from "./ng2-sticky.directive";

export { Ng2StickyDirective };

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [Ng2StickyDirective],
  exports: [ Ng2StickyDirective ]
})
export class Ng2StickyModule {}
