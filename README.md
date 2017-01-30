# ng2-sticky
position: sticky implementaion in Angular2

[Demo](https://rawgit.com/ng2-ui/ng2-sticky/master/app/index.html)

Plunker Example: https://plnkr.co/edit/ZKwAHN?p=preview

## Install

1. install ng2-sticky

        $ npm install ng2-sticky --save

2. If you are not using webpack, add `map` and `packages` to your `systemjs.config.js`

        map['ng2-sticky'] = 'node_modules/ng2-sticky/dist';
        packages['ng2-sticky'] = { main: 'ng2-sticky.umd.js', defaultExtension: 'js' }

3. import Ng2StickyModule to your AppModule

        import { NgModule } from '@angular/core';
        import { FormsModule } from "@angular/forms";
        import { BrowserModule  } from '@angular/platform-browser';
        import { AppComponent } from './app.component';
        import { Ng2StickyModule } from 'ng2-sticky';
        
        @NgModule({
          imports: [BrowserModule, FormsModule, Ng2StickyModule],
          declarations: [AppComponent],
          bootstrap: [ AppComponent ]
        })
        export class AppModule { }

         
For full example, please check out `test` directory to see the example of;

  - `systemjs.config.js`
  - `app.module.ts`
  -  and `app.component.ts`.

## Usage it in your code

      <div class="div-middle">
        <div>One</div>
        <div>After</div>
        <div>Another</div>
        
        <div ng2-sticky>
        
        <br/><br/><br/>
        <div>One</div>
        <div>After</div>
        <div>Another</div>
      </div>

## **ng2-ui** welcomes new members and contributors

This module is only improved and maintained by contributors like you.

As a contributor, it's NOT required to be skilled in Javascript nor Angular2. 
You are only to be open-minded and interested in helping others.
As a contributor, you do following;

  * Updating README.md
  * Improving code comments
  * Answering issues and building FAQ
  * Documentation
  * Translation

In result of your active contribution, you will be listed as a core contributor
on https://ng2-ui.github.io, and a member of ng2-ui too.

If you are interested in becoming a contributor and/or a member of ng-ui,
please send me email to `allenhwkim AT gmail.com` with your github id. 
