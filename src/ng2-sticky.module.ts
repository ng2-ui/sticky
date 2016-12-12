import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule  } from '@angular/common';

import {Ng2StickyDirective} from "./ng2-sticky.directive";

export { Ng2StickyDirective };

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [Ng2StickyDirective],
  exports: [ Ng2StickyDirective ]
})
export class Ng2StickyModule {}
