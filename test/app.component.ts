import {Component} from '@angular/core'
import { HelloWorld } from 'my-npm';

@Component({
  selector: 'my-app',
  template: `Hello {{world}}`,
  providers: [HelloWorld]
})
export class AppComponent {
  constructor(helloWorld: HelloWorld) {
    this.world = helloWorld.world;
  }
}
