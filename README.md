# @ngui/sticky
position: sticky implementaion in Angular2

## IMPORTANT NOTICE
After 0.7.0 or higher, ng2-sticky has been changed to @ngui/stikcy. Here are the changes;

 * Module ng2-sticky has been changed to @ngui/stikcy.
 * Direvtive ng2-sticky is moved to ngui-stikcy.
 * Class name Ng2StickyModule is moved to NguiStickyModule.

[Demo](https://rawgit.com/ng2-ui/sticky/master/app/index.html)

Plunker Example: https://plnkr.co/edit/ZKwAHN?p=preview

## Install

1. install @ngui/sticky

        $ npm install @ngui/sticky --save

2. If you are not using webpack, add `map` and `packages` to your `systemjs.config.js`

        map['@ngui/sticky'] = 'node_modules/@ngui/sticky/dist/sticky.umd.js';

3. import NguiStickyModule to your AppModule

        import { NgModule } from '@angular/core';
        import { FormsModule } from "@angular/forms";
        import { BrowserModule  } from '@angular/platform-browser';
        import { AppComponent } from './app.component';
        import { NguiStickyModule } from '@ngui/sticky';
        
        @NgModule({
          imports: [BrowserModule, FormsModule, NguiStickyModule],
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
        
        <div ngui-sticky>
        
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
