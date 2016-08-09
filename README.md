# ng2-sticky
position: sticky implementaion in Angular2

[Demo](https://ng2-ui.github.io/#/sticky)

Plunker Example: https://plnkr.co/edit/ZKwAHN?p=preview

## Install

1. install ng2-sticky

        $ npm install ng2-sticky --save

2. add `map` and `packages` to your `systemjs.config.js`

        map['ng2-sticky'] = 'node_modules/ng2-sticky/dist';
        packages['ng2-sticky'] = { main: 'index.js', defaultExtension: 'js']

## Usage it in your code

1. import and add directive in your component

        import { Ng2StickyDirective } from 'ng2-sticky';

        @Component({
          selector: 'my-app',
          templateUrl: './app/app.tpl.html',
          directives: [ Ng2StickyDirective ]
        })


2. You are ready. use it in your template

        <div ng2-sticky>
          This will stick to view when scrolls
        </div>

