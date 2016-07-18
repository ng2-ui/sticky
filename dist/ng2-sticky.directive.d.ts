import { ElementRef } from '@angular/core';
export declare class Ng2StickyDirective {
    sticky: HTMLElement;
    parent: HTMLElement;
    el: HTMLElement;
    parentEl: HTMLElement;
    diff: any;
    original: any;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    attach(): void;
    detach(): void;
    scrollHandler: () => void;
}
