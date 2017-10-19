import { AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
export declare class NguiStickyDirective implements AfterViewInit, OnDestroy {
    protected renderer: Renderer2;
    stickyAfter: string;
    protected el: HTMLElement;
    protected parentEl: HTMLElement;
    protected fillerEl: HTMLElement;
    protected stickyAfterElement: HTMLElement;
    protected diff: any;
    protected original: any;
    protected STICKY_CLASSES: {
        STUCK: string;
        UNSTUCK: string;
        TOP: string;
        BOTTOM: string;
        FILLER: string;
        CONTAINER: string;
    };
    constructor(el: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    protected attach(): void;
    protected detach(): void;
    protected scrollHandler: () => void;
}
