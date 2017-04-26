"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var sticky_directive_1 = require("./sticky.directive");
exports.NguiStickyDirective = sticky_directive_1.NguiStickyDirective;
var NguiStickyModule = (function () {
    function NguiStickyModule() {
    }
    return NguiStickyModule;
}());
NguiStickyModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [sticky_directive_1.NguiStickyDirective],
                exports: [sticky_directive_1.NguiStickyDirective]
            },] },
];
/** @nocollapse */
NguiStickyModule.ctorParameters = function () { return []; };
exports.NguiStickyModule = NguiStickyModule;
//# sourceMappingURL=sticky.module.js.map