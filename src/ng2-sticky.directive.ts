'use strict';

import { Directive, ElementRef } from '@angular/core';
import { computedStyle } from 'ng2-utils';

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
    this.sticky = el.nativeElement;
    this.parent = el.nativeElement.parentNode;

    this.el = el.nativeElement;
    this.parentEl = this.el.parentElement;
  }

  ngAfterViewInit() {
    this.el.style.boxSizing = 'border-box';
    // set the parent relatively positioned
    let allowedPositions = ['absolute', 'fixed', 'relative'];
    let parentElPosition = computedStyle(this.parentEl, 'position');
    if (allowedPositions.indexOf(parentElPosition) === -1) { //inherit, initial, unset
      this.parentEl.style.position = 'relative';
    }

    this.diff = {
      top: this.sticky.offsetTop - this.parent.offsetTop,
      left: this.sticky.offsetLeft - this.parent.offsetLeft
    };

    let elRect = this.el.getBoundingClientRect();
    this.original = {
      boundingClientRect: elRect,
      position: computedStyle(this.el, 'position'),
      float: computedStyle(this.el, 'float'),
      top:  computedStyle(this.el, 'top'),
      bottom:  computedStyle(this.el, 'bottom'),
      left: computedStyle(this.el, 'left'),
      width: computedStyle(this.el, 'width'),
      offsetTop: this.el.offsetTop,
      offsetLeft: this.el.offsetLeft,
      marginTop: parseInt(computedStyle(this.el, 'marginTop')),
      marginBottom: parseInt(computedStyle(this.el, 'marginBottom')),
      marginLeft: parseInt(computedStyle(this.el, 'marginLeft')),
      marginRight: parseInt(computedStyle(this.el, 'marginLeft'))
    };

    this.attach();
  }

  attach() {
    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.scrollHandler);
  }

  detach() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.scrollHandler);
  }

  scrollHandler = () => {
    let elRect = this.el.getBoundingClientRect();
    let parentRect = this.el.parentElement.getBoundingClientRect();
    let bodyRect = document.body.getBoundingClientRect();
    let dynProps; 

    if (this.original.float === "right") {
      let right = bodyRect.right - parentRect.right + this.original.marginRight;
      dynProps = { right: right +'px' };
    } else if (this.original.float === "left") {
      let left = parentRect.left - bodyRect.left + this.original.marginLeft;
      dynProps = { left: left +'px'};
    } else {
      //console.log('parentRect..............', parentRect.width);
      dynProps = {width: parentRect.width +'px'};
    }
    //console.log('dynProps', dynProps);
      
    /**
     * stikcy element reached to the bottom of the container
     */
    if (this.original.marginTop + this.original.marginBottom 
    + this.original.boundingClientRect.height + this.stickyOffsetTop >= parentRect.bottom) {
      // console.log('case 1 (absolute)', parentRect.bottom, this.original.marginBottom);
      let floatAdjustment = 
        this.original.float === "right" ? {right: 0} :
        this.original.float === "left" ? {left: 0} : {};
      Object.assign(this.el.style, {
        position: 'absolute',
        float: 'none',
        top: 'inherit',
        bottom: 0
      }, dynProps, floatAdjustment)
    }
    /**
     * stikcy element is in the middle of container
     */
    else if (parentRect.top * -1 + this.original.marginTop > this.original.offsetTop) {
      // console.log('case 2 (fixed)', parentRect.top * -1 + this.original.marginTop, this.original.offsetTop);
      Object.assign(this.el.style, {
        position: 'fixed', //fixed is a lot smoother than absolute
        float: 'none',
        top: 0,
        bottom: 'inherit'
      }, dynProps)
    }
    /**
     * stikcy element is in the original position
     */
    else {
      // console.log('case 3 (original)');
      Object.assign(this.el.style, {
        position: this.original.position,
        float: this.original.float,
        top: this.original.top,
        bottom: this.original.bottom,
        width: this.original.width,
        left: this.original.left
      }, dynProps)
    }
  }
}
