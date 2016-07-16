'use strict';

import { Directive, ElementRef } from '@angular/core';
import { getElementVisibleIn, getStyle } from './util';

@Directive({
  selector: '[ng2-sticky]'
})
export class Ng2StickyDirective {
  sticky: HTMLElement;
  parent: HTMLElement;

  el: HTMLElement;
  parentEl: HTMLElement;

  diff: any;
  original: any;

  constructor(el: ElementRef) {
    console.log('constructor is called');
    this.sticky = el.nativeElement;
    this.parent = el.nativeElement.parentNode;

    this.el = el.nativeElement;
    this.parentEl = this.el.parentElement;
  }

  ngAfterViewInit() {
    // set to relatively positoined
    if (['absolute', 'fixed', 'relative'].indexOf(getStyle(this.el, 'position') !== -1)) { //inherit, initial, unset
      this.parentEl.style.position = 'relative';
    }

    this.diff = {
      top: this.sticky.offsetTop - this.parent.offsetTop,
      left: this.sticky.offsetLeft - this.parent.offsetLeft
    };

    let elRect = this.el.getBoundingClientRect();
    this.original = {
      boundingClientRect: elRect,
      position: getStyle(this.el, 'position'),
      float: getStyle(this.el, 'float'),
      top:  getStyle(this.el, 'top'),
      bottom:  getStyle(this.el, 'bottom'),
      left: getStyle(this.el, 'left'),
      offsetTop: this.el.offsetTop,
      offsetLeft: this.el.offsetLeft,
      marginTop: parseInt(getStyle(this.el, 'marginTop')),
      marginBottom: parseInt(getStyle(this.el, 'marginBottom')),
      marginLeft: parseInt(getStyle(this.el, 'marginLeft'))
    };

    this.attach();
  }

  attach() {
    console.log('attach is called');
    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.scrollHandler);
  }

  detach() {
    console.log('detach is called');
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.scrollHandler);
  }

  scrollHandler = () => {
    let elRect = this.el.getBoundingClientRect();
    let parentRect = this.el.parentElement.getBoundingClientRect();
    // let parentElVisible = getElementVisibleIn(this.parentEl, window);
    // let elVisible       = getElementVisibleIn(this.el, this.parentEl);

    if (parentRect.top < 0 && parentRect.bottom > 0) {
      /**
       * stikcy element reached to the bottom of the container
       */
      if (parentRect.bottom <= this.original.boundingClientRect.height + this.original.marginBottom ) {
        console.log('case 1 (absolute)', parentRect.bottom, this.original.marginBottom);
        Object.assign(this.el.style, {
          position: 'absolute',
          float: 'none',
          top: 'inherit',
          bottom: 0,
          left: (this.original.offsetLeft - this.original.marginLeft) + 'px'
        })
      }
      /**
       * stikcy element is in the middle of container
       */
      else if (parentRect.top * -1 > (this.original.offsetTop + this.original.marginTop)) {
        console.log('case 2 (fixed)', parentRect.top * -1, this.original.offsetTop);
        Object.assign(this.el.style, {
          position: 'fixed', //fixed is a lot smoother than absolute
          float: 'none',
          top: 0,
          bottom: 'inherit',
          left: (this.original.boundingClientRect.left - this.original.marginLeft) + 'px'
        })
      }
      /**
       * stikcy element is in the original position
       */
      else {
        console.log('case 3 (original)');
        Object.assign(this.el.style, {
          position: this.original.position,
          float: this.original.float,
          top: this.original.top,
          bottom: this.original.bottom,
          left: this.original.left
        })
      }
    }
  }
}
