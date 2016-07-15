# ???
???

https://github.com/1000ch/position-sticky

<a href="https://plnkr.co/edit/Yq78qE?p=preview">
  <img src="http://i.imgur.com/0qcxg8X.png" width="50% border="1" />
</a>

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

