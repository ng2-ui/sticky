'use strict';

import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { computedStyle } from '@ngui/utils';

@Directive({
  selector: '[ngui-sticky]'
})
export class NguiStickyDirective implements AfterViewInit, OnDestroy {
  @Input('sticky-after') public stickyAfter: string;  // css selector to be sticky after

  protected el: HTMLElement;
  protected parentEl: HTMLElement;
  protected fillerEl: HTMLElement;
  protected stickyAfterElement: HTMLElement;

  protected diff: any;
  protected original: any;

  protected STICKY_CLASSES = {
    STUCK: 'ngui-sticky-stuck',
    UNSTUCK: 'ngui-sticky-unstuck',
    TOP: 'ngui-sticky-top',
    BOTTOM: 'ngui-sticky-bottom',
    FILLER: 'ngui-sticky-filler',
    CONTAINER: 'ngui-sticky-container'
  };

  constructor(el: ElementRef, protected renderer: Renderer2) {
    this.el = this.el = el.nativeElement;
    this.parentEl = this.el.parentElement;
  }

  public ngAfterViewInit(): void {
    this.el.style.boxSizing = 'border-box';
    this.renderer.addClass(this.el, this.STICKY_CLASSES.UNSTUCK);
    this.renderer.addClass(this.el, this.STICKY_CLASSES.TOP);
    this.renderer.addClass(this.parentEl, this.STICKY_CLASSES.CONTAINER);
    
    if (this.stickyAfter) {
      this.stickyAfterElement = document.querySelector(this.stickyAfter) as HTMLElement;
    }

    // set the parent relatively positioned
    let allowedPositions = ['absolute', 'fixed', 'relative'];
    let parentElPosition = computedStyle(this.parentEl, 'position');
    if (allowedPositions.indexOf(parentElPosition) === -1) { //inherit, initial, unset
      this.parentEl.style.position = 'relative';
    }

    this.diff = {
      top: this.el.offsetTop - this.parentEl.offsetTop,
      left: this.el.offsetLeft - this.parentEl.offsetLeft
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

  public ngOnDestroy(): void {
    this.detach();
  }

  protected attach(): void {
    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.scrollHandler);
  }

  protected detach(): void {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.scrollHandler);
  }

  protected scrollHandler = () => {
    let parentRect: ClientRect = this.el.parentElement.getBoundingClientRect();
    let bodyRect: ClientRect = document.body.getBoundingClientRect();
    let stickyOffsetTop = this.stickyAfterElement ? this.stickyAfterElement.getBoundingClientRect().bottom : 0;
    let dynProps;

    if (this.original.float === 'right') {
      let right = bodyRect.right - parentRect.right + this.original.marginRight;
      dynProps = { right: right + 'px' };
    } else if (this.original.float === 'left') {
      let left = parentRect.left - bodyRect.left + this.original.marginLeft;
      dynProps = { left: left + 'px'};
    } else {
      dynProps = {width: parentRect.width + 'px'};
    }

    if (this.original.marginTop + this.original.marginBottom +
      this.original.boundingClientRect.height + stickyOffsetTop >= parentRect.bottom) {
      /**
       * sticky element reached to the bottom of the container
       */
      let floatAdjustment =
        this.original.float === 'right' ? {right: 0} :
        this.original.float === 'left' ? {left: 0} : {};
      Object.assign(this.el.style, {
        position: 'absolute',
        float: 'none',
        top: 'inherit',
        bottom: 0
      }, dynProps, floatAdjustment);
      this.renderer.removeClass(this.el, this.STICKY_CLASSES.STUCK);
      this.renderer.removeClass(this.el, this.STICKY_CLASSES.TOP);
      this.renderer.addClass(this.el, this.STICKY_CLASSES.UNSTUCK);
      this.renderer.addClass(this.el, this.STICKY_CLASSES.BOTTOM);
    } else if (parentRect.top * -1 + this.original.marginTop + stickyOffsetTop > this.original.offsetTop) {
      /**
       * sticky element is in the middle of container
       */

      // if not floating, add an empty filler element, since the original elements becames 'fixed'
      if (this.original.float !== 'left' && this.original.float !== 'right' && !this.fillerEl) {
        this.fillerEl = document.createElement('div');
        this.fillerEl.style.height = this.el.offsetHeight + 'px';
        this.renderer.addClass(this.fillerEl, this.STICKY_CLASSES.FILLER);
        this.parentEl.insertBefore(this.fillerEl, this.el);
      }

      Object.assign(this.el.style, {
        position: 'fixed', //fixed is a lot smoother than absolute
        float: 'none',
        top: stickyOffsetTop + 'px',
        bottom: 'inherit'
      }, dynProps);
      this.renderer.removeClass(this.el, this.STICKY_CLASSES.UNSTUCK);
      this.renderer.removeClass(this.el, this.STICKY_CLASSES.TOP);
      this.renderer.removeClass(this.el, this.STICKY_CLASSES.BOTTOM);
      this.renderer.addClass(this.el, this.STICKY_CLASSES.STUCK);
    } else {
      /**
       * sticky element is in the original position
       */
      if (this.fillerEl) {
        this.parentEl.removeChild(this.fillerEl); //IE11 does not work with el.remove()
        this.fillerEl = undefined;
      }
      Object.assign(this.el.style, {
        position: this.original.position,
        float: this.original.float,
        top: this.original.top,
        bottom: this.original.bottom,
        width: this.original.width,
        left: this.original.left
      }, dynProps);
      this.renderer.removeClass(this.el, this.STICKY_CLASSES.STUCK);
      this.renderer.removeClass(this.el, this.STICKY_CLASSES.BOTTOM);
      this.renderer.addClass(this.el, this.STICKY_CLASSES.UNSTUCK);
      this.renderer.addClass(this.el, this.STICKY_CLASSES.TOP);
    }
  }
}

