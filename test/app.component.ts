import {Component} from '@angular/core'
import { Ng2StickyDirective } from 'ng2-sticky';

console.log('Ng2StickyDirective', Ng2StickyDirective);

@Component({
  selector: 'my-app',
  directives: [Ng2StickyDirective],
  template: `
    <div class="container">
      <div class="float-right">
        <div ng2-sticky style="float: right"> float: right </div>
      </div>
      
      <div class="float-left">
        <div ng2-sticky style="float: left"> float: left </div>
      </div>
      
      <div class="div-middle">
        <div>One</div> <div>After</div> <div>Another</div>
        <div ng2-sticky> &lt;div> tag in the middle </div>
        <div>One</div> <div>After</div> <div>Another</div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      margin: 0 auto;
      padding: 10px;
      min-width: 640px;
      max-width: 960px;
      background-color: #eee;
    }
    .container > div {
      margin: 20px;
      border: 1px solid #333;
      background-image: linear-gradient(rgba(255, 255, 255, 1) 50%, transparent 50%, transparent);
      background-size: 50px 50px;
      height: 1000px;
    }
    .float-left {
      background-color: rgba(255,0,0, .2);
    }
    .float-right {
      background-color: rgba(0,255,0, .2);
    }
    .div-middle {
      background-color: rgba(0,0,255, .2);
    }
    div[ng2-sticky] {
      margin: 30px 10px 10px 10px;
      min-width: 400px;
      text-align: center;
      background: #333;
      color: #fff;
      border: 1px solid #333;
      padding: 10px;
    }
    .div-middle div[ng2-sticky] {
      margin: 0;
    }
 `]
})
export class AppComponent {
  constructor() {}
}
