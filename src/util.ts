export function scrollTo(selector: string, parentSelector: string): void {
  console.log('selector', selector, 'parentSelector', parentSelector);
  let parentEl: HTMLElement, targetEl: HTMLElement;

  targetEl = <HTMLElement>document.querySelector(selector);
  if (!targetEl) { throw `Invalid selector ${selector}`; }

  parentEl = <HTMLElement>document.querySelector(parentSelector);
  if (!parentEl) { throw `Invalid parent selector ${parentSelector}`; }

  let parentElStyle = <HTMLElement>window.getComputedStyle(parentEl);
  parentEl = parentElStyle['overflow'] === 'auto' ? parentEl : document.body;

  let currentScrollTop = parentEl.scrollTop;
  let targetOffsetTop = targetEl.offsetTop;
  if (parentEl === document.body) {
    let bodyRect = document.body.getBoundingClientRect();
    let targetRect = targetEl.getBoundingClientRect();
    targetOffsetTop = targetRect.top - bodyRect.top;
  }

  let step = Math.ceil((targetOffsetTop - currentScrollTop) / 10);

  (function loop(i: number): void {
    setTimeout(function main() {
      parentEl.scrollTop += step;
      i > 1 && loop(i - 1);
    }, 50);
  }(10));
}

export function getElementVisibleIn(innerEl: HTMLElement, outerEl: HTMLElement | Window): { [id:string]: boolean } {
  let innerRect = innerEl.getBoundingClientRect();
  let isTopVisible: boolean, isBottomVisible: boolean;

  if (outerEl === window) {
    isTopVisible = innerRect.top > 0;
    isBottomVisible = innerRect.bottom > 0;
  } else {
    let outerRect = (<HTMLElement>outerEl).getBoundingClientRect();
    let outerRectBorderTopWidth = parseInt(getStyle(outerEl, 'border-top-width'), 10);

    /* top is visible or bottom is visible */
    isTopVisible = (
      innerRect.top > 0
      && innerRect.top >= outerRect.top
      && innerRect.top < outerRect.bottom
    );
    isBottomVisible = (
      innerRect.bottom > 0
      && innerRect.bottom > (outerRect.top + outerRectBorderTopWidth)
      && innerRect.bottom < outerRect.bottom
    );
  }

  return {
    top:    isTopVisible,
    bottom: isBottomVisible
  }
}

export function isElementPartlyVisible(innerEl: HTMLElement, outerEl: HTMLElement | Window): boolean {
  let visible = getElementVisibleIn(innerEl, outerEl);
  return visible['top'] || visible['bottom'];
}

export function getStyle(el, styleProp): string {
  var value, defaultView = (el.ownerDocument || document).defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
      return (function(value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
    return value;
  }
}