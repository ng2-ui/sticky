'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_utils_1 = require('ng2-utils');
var Ng2StickyDirective = (function () {
    function Ng2StickyDirective(el) {
        var _this = this;
        this.scrollHandler = function () {
            var elRect = _this.el.getBoundingClientRect();
            var parentRect = _this.el.parentElement.getBoundingClientRect();
            /**
             * stikcy element reached to the bottom of the container
             */
            if (parentRect.bottom <= _this.original.marginTop + _this.original.boundingClientRect.height + _this.original.marginBottom) {
                // console.log('case 1 (absolute)', parentRect.bottom, this.original.marginBottom);
                Object.assign(_this.el.style, {
                    position: 'absolute',
                    float: 'none',
                    top: 'inherit',
                    bottom: 0,
                    width: _this.original.width,
                    left: (_this.original.offsetLeft - _this.original.marginLeft) + 'px'
                });
            }
            else if (parentRect.top * -1 + _this.original.marginTop > _this.original.offsetTop) {
                // console.log('case 2 (fixed)', parentRect.top * -1 + this.original.marginTop, this.original.offsetTop);
                Object.assign(_this.el.style, {
                    position: 'fixed',
                    float: 'none',
                    top: 0,
                    bottom: 'inherit',
                    width: _this.original.width,
                    left: (_this.original.boundingClientRect.left - _this.original.marginLeft) + 'px'
                });
            }
            else {
                // console.log('case 3 (original)');
                Object.assign(_this.el.style, {
                    position: _this.original.position,
                    float: _this.original.float,
                    top: _this.original.top,
                    bottom: _this.original.bottom,
                    width: _this.original.width,
                    left: _this.original.left
                });
            }
        };
        console.log('constructor is called');
        this.sticky = el.nativeElement;
        this.parent = el.nativeElement.parentNode;
        this.el = el.nativeElement;
        this.parentEl = this.el.parentElement;
    }
    Ng2StickyDirective.prototype.ngAfterViewInit = function () {
        // set to relatively positioned
        if (['absolute', 'fixed', 'relative'].indexOf(ng2_utils_1.computedStyle(this.el, 'position')) !== -1) {
            this.parentEl.style.position = 'relative';
        }
        this.diff = {
            top: this.sticky.offsetTop - this.parent.offsetTop,
            left: this.sticky.offsetLeft - this.parent.offsetLeft
        };
        var elRect = this.el.getBoundingClientRect();
        this.original = {
            boundingClientRect: elRect,
            position: ng2_utils_1.computedStyle(this.el, 'position'),
            float: ng2_utils_1.computedStyle(this.el, 'float'),
            top: ng2_utils_1.computedStyle(this.el, 'top'),
            bottom: ng2_utils_1.computedStyle(this.el, 'bottom'),
            left: ng2_utils_1.computedStyle(this.el, 'left'),
            width: ng2_utils_1.computedStyle(this.el, 'width'),
            offsetTop: this.el.offsetTop,
            offsetLeft: this.el.offsetLeft,
            marginTop: parseInt(ng2_utils_1.computedStyle(this.el, 'marginTop')),
            marginBottom: parseInt(ng2_utils_1.computedStyle(this.el, 'marginBottom')),
            marginLeft: parseInt(ng2_utils_1.computedStyle(this.el, 'marginLeft'))
        };
        this.attach();
    };
    Ng2StickyDirective.prototype.attach = function () {
        console.log('sticky element attach is called');
        window.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('resize', this.scrollHandler);
    };
    Ng2StickyDirective.prototype.detach = function () {
        console.log('sticky element detach is called');
        window.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('resize', this.scrollHandler);
    };
    Ng2StickyDirective = __decorate([
        core_1.Directive({
            selector: '[ng2-sticky]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Ng2StickyDirective);
    return Ng2StickyDirective;
}());
exports.Ng2StickyDirective = Ng2StickyDirective;
//# sourceMappingURL=ng2-sticky.directive.js.map