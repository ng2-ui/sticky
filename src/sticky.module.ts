import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule  } from '@angular/common';

import {NguiStickyDirective} from "./sticky.directive";

export { NguiStickyDirective };

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [NguiStickyDirective],
  exports: [ NguiStickyDirective ]
})
export class NguiStickyModule {}

