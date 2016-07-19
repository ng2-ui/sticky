# ???
???

https://plnkr.co/edit/ZKwAHN?p=preview

## Install

1. install ???

        $ npm install ???

2. add `map` and `packages` to your `systemjs.config.js`

        map['???'] = 'node_modules/???';
        packages['???'] = { main: 'dist/index.js', defaultExtension: 'js']

## Usage it in your code

1. import and add directive in your component

        import { ??? } from '???';

        @Component({
          selector: 'my-app',
          templateUrl: './app/app.tpl.html',
          directives: [ ??? ]
        })


2. You are ready. use it in your template

        <div ???="???">
          Loading...
        </div>

