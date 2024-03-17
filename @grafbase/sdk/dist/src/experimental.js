"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experimental = void 0;
var Experimental = /** @class */ (function () {
    function Experimental(params) {
        this.params = params;
    }
    Experimental.prototype.toString = function () {
        var _this = this;
        var params = Object.keys(this.params)
            .map(function (key) { return "".concat(key, ": ").concat(_this.params[key]); })
            .join(', ');
        return params ? "extend schema\n  @experimental(".concat(params, ")\n\n") : '';
    };
    return Experimental;
}());
exports.Experimental = Experimental;
